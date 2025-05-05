import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer';
import { apiClient } from '@/lib/api/botService';
interface Bot {
    id: string;
    name: string;
    description: string;
    logo:string
    collegeUrl:string
    // Add other bot properties as needed
  }

interface BotState{
    bots: Bot[];
    currentBot: Bot | null;
    loading: boolean;
    error: string | null;
    fetchBots: () => Promise<void>;
}  

export const useBotStore = create<BotState>()(
    immer((set)=>({
        bots: [],
        currentBot: null,
        loading: false,
        error: null,
    
        fetchBots: async () => {
          set({ loading: true, error: null });
          try {
            const bots = await apiClient.getAllBots();
            set({ bots, loading: false });
          } catch (error) {
            set({ error: 'Failed to fetch bots', loading: false });
            console.error(error)
          }
        }
    }
))
)