// hooks/useChat.ts
import { useEffect } from 'react';
import { useChatStore } from '@/store/useChatStore';

export const useChat = (botId?: string) => {
  const {
    messages,
    isStreaming,
    error,
    currentBot,
    startStream,
    stopStream,
    clearChat,
    retryLastMessage,
    setCurrentBot
  } = useChatStore();

  // Set current bot when hook initializes or botId changes
  useEffect(() => {
    if (botId && botId !== currentBot) {
      setCurrentBot(botId);
    }
  }, [botId, currentBot, setCurrentBot]);

  const sendMessage = (message: string) => {
    if (!botId) {
      console.error('No bot selected');
      return;
    }
    startStream(botId, message);
  };

  return {
    messages: messages.filter(m => !m.id.startsWith('temp-')), // Filter out temp messages
    isStreaming,
    error,
    currentBot,
    sendMessage,
    stopStream,
    clearChat,
    retryLastMessage
  };
};