import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ApiOptions extends AxiosRequestConfig {
  headers?: Record<string, string>;
  type?: 'get' | 'post' | 'put' | 'delete'; // Added type for method
}
interface Bot{
    id: string;
    name: string;
    description: string;
    logo:string
    collegeUrl:string
}
interface BotListResponse {
    status: number;
    data: Bot[] ;
    currentBot:Bot;
    message?: string;
    success?:boolean
  }
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1'; // Provide a default or fallback value
    this.defaultHeaders = {
      'Content-Type': 'application/json', // Fixed typo
      'Accept': 'application/json'
    };
  }

  private async customFetch<T = unknown>(
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };
      
      const config: AxiosRequestConfig = {
        ...options,
        url,
        headers,
        withCredentials: true, // Fixed spelling
        method: options.type || 'get' // Use type or default to get
      };

      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('API Error:', axiosError.response?.data || axiosError.message);
      throw axiosError.response?.data || new Error('API request failed');
    }
  }

  // Specific bot methods
  public async getAllBots(): Promise<BotListResponse> {
    
    return this.customFetch<BotListResponse>('/admin/getAllBot', {
      type: 'get'
    });
  }

  public async getBotById(link:string): Promise<BotListResponse>{
      return this.customFetch<BotListResponse>(`/admin/getCurrent/${link}`,{
        type:'get',
      })
  }
}

export const apiClient = new ApiClient();
