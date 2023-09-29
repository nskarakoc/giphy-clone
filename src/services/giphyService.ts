import { GifSearchResult } from '@/domains/giphy/gifSearchResult';
import { GiphyServiceError } from '@/errors/giphy/giphyServiceError';
import axios, { AxiosError, Method } from 'axios';

const API_URL = 'https://api.giphy.com';
const API_KEY = process.env.GIPHY_API_KEY;

export class GiphyService {
  private axiosInstance = axios.create({
    baseURL: API_URL,
    params: {
      api_key: API_KEY,
    },
  });

  private async callApi<T>({
    method,
    params,
    path,
  }: {
    method: Method;
    params: any;
    path: string;
  }): Promise<T> {
    let response;

    try {
      response = await this.axiosInstance.request({
        method,
        params,
        url: `${API_URL}${path}`,
      });
    } catch (error) {
      console.log(error instanceof AxiosError ? error.message : undefined);
      throw new GiphyServiceError(
        error instanceof AxiosError ? error.message : undefined,
      );
    }

    return response.data;
  }

  async searchGifs({
    limit,
    offset,
    q,
  }: {
    limit?: number;
    offset?: number;
    q: string;
  }): Promise<GifSearchResult> {
    return this.callApi({
      method: 'GET',
      params: {
        limit,
        offset,
        q,
      },
      path: '/v1/gifs/search',
    });
  }
}

export const giphyService = new GiphyService();
