import { create } from 'zustand';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  isComplete: boolean;
  timestamp: number;
  botId?: string;
}

interface ChatState {
  messages: Message[];
  currentBot: string | null;
  isStreaming: boolean;
  error: string | null;
  abortController: AbortController | null; // Changed from EventSource to AbortController
  startStream: (botId: string, message: string) => Promise<void>;
  stopStream: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, update: Partial<Message>) => void;
  clearChat: () => void;
  retryLastMessage: () => void;
  setCurrentBot: (botId: string | null) => void; 
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  currentBot: null,
  isStreaming: false,
  error: null,
  abortController: null, // Now properly typed as AbortController

  startStream: async (botId, message) => {
    const { stopStream, addMessage, updateMessage } = get();
    
    // Clean up any existing connection
    stopStream();

    try {
      set({ 
        isStreaming: true, 
        error: null, 
        currentBot: botId 
      });

      // Add user message
      addMessage({
        content: message,
        role: 'user',
        isComplete: true,
        botId
      });

      // Add empty assistant message that will be updated
      const tempId = `temp-${Date.now()}`;
      addMessage({
        content: '',
        role: 'assistant',
        isComplete: false,
        botId
      });

      // Create a new AbortController for the fetch request
      const controller = new AbortController();
      set({ abortController: controller });

      const response = await fetch(`/api/chat/${botId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const processStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            
            // Process each complete event
            while (buffer.includes('\n\n')) {
              const eventEnd = buffer.indexOf('\n\n');
              const eventData = buffer.substring(0, eventEnd);
              buffer = buffer.substring(eventEnd + 2);

              if (eventData.startsWith('data: ')) {
                const jsonData = eventData.substring(6);
                try {
                  const { type, content, botId: responseBotId } = JSON.parse(jsonData);

                  if (type === 'chunk') {
                    updateMessage(tempId, {
                      content: get().messages.find(m => m.id === tempId)?.content + content,
                      botId: responseBotId
                    });
                  } else if (type === 'complete') {
                    updateMessage(tempId, {
                      isComplete: true,
                      id: Date.now().toString(), // Replace temp ID
                      botId: responseBotId
                    });
                    set({ isStreaming: false, abortController: null });
                    return;
                  } else if (type === 'error') {
                    throw new Error(content || 'Error from server');
                  }
                } catch (e) {
                  console.error('Error parsing event:', e);
                }
              }
            }
          }

          // Final update if stream ends without complete event
          updateMessage(tempId, {
            isComplete: true,
            id: Date.now().toString()
          });
          set({ isStreaming: false, abortController: null });
        } catch (error) {
          console.error('Stream reading error:', error);
          set({ 
            isStreaming: false,
            error: error instanceof Error ? error.message : 'Stream error occurred',
            abortController: null
          });
          controller.abort();
        }
      };

      processStream();

    } catch (error) {
      set({ 
        isStreaming: false,
        error: error instanceof Error ? error.message : 'Failed to start chat',
        abortController: null
      });
    }
  },

  stopStream: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
    }
    set({ 
      isStreaming: false,
      abortController: null
    });
  },

  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now(),
      isComplete: message.isComplete ?? true
    };
    
    set(state => ({
      messages: [...state.messages, newMessage]
    }));
  },

  updateMessage: (id, update) => {
    set(state => ({
      messages: state.messages.map(msg => 
        msg.id === id ? { ...msg, ...update } : msg
      )
    }));
  },

  clearChat: () => {
    get().stopStream();
    set({ 
      messages: [], 
      currentBot: null,
      error: null
    });
  },

  retryLastMessage: () => {
    const { messages, currentBot, stopStream } = get();
    stopStream();
    
    const lastUserMessage = [...messages]
      .reverse()
      .find(m => m.role === 'user');
    
    if (lastUserMessage && currentBot) {
      // Remove any incomplete assistant messages
      set(state => ({
        messages: state.messages.filter(m => m.isComplete)
      }));
      
      get().startStream(currentBot, lastUserMessage.content);
    }
  },
  setCurrentBot: (botId) => {
    set({ currentBot: botId });
  }
}));