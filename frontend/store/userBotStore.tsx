import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { apiClient } from '@/lib/api/botService';

interface Bot {
  id: string;
  name: string;
  description: string;
  logo: string;
  collegeUrl: string;
}

interface BotListResponse<> {
  statusCode: number | null;
  data: Bot[];
  message?: string;
  success?:boolean
}

interface BotState {
  bots: BotListResponse;
  currentBot: Bot | null;
  loading: boolean;
  error: string | null;
  fetchBots: () => Promise<void>;
  getBotById: (collegeId: string) => Promise<void>
}
export const useBotStore = create<BotState>()(
    immer((set)=>({
      bots: {
        statusCode: null,
        data: [],
       
      },
      currentBot: null,
      loading: false,
      error: null,
    
      fetchBots: async () => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.getAllBots();
          
          if (response.status !< 300) {
            throw new Error(response.message || 'Failed to fetch bots');
          }
  
          set({ 
            bots: {
              statusCode: response.status,
              data: response.data,
              message:response.message,
              success:response.success
            },
            loading: false 
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('Fetch error:', errorMessage);
          set({ 
            error: errorMessage,
            loading: false 
          });
        }
      },
      getBotById: async(collegeId:string)=>{
        try {
          const response =await apiClient.getBotById(collegeId)
          if (response.status !< 300) {
            throw new Error(response.message || 'Failed to fetch bot');
          }
          set({
           currentBot:response.currentBot
          })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('Fetch error:', errorMessage);
          set({ 
            error: errorMessage,
            loading: false 
          });
        }
      }
    }))
  );