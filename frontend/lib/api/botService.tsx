import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ApiOptions extends AxiosRequestConfig {
  headers?: Record<string, string>;
  type?: 'get' | 'post' | 'put' | 'delete'; // Added type for method
}

interface Bot {
  id: string;
  name: string;
  description: string;
  logo:string
  collegeUrl:string
  // Add other bot properties as needed
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000/api';
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
  public async getAllBots(): Promise<Bot[]> {
    return this.customFetch<Bot[]>('/getAllBots', {
      type: 'get'
    });
  }
}

export const apiClient = new ApiClient();
