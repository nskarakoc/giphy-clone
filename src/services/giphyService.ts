import { Gif } from '@/domains/giphy/gif';
import { GifSearchResult } from '@/domains/giphy/gifSearchResult';
import { GiphyServiceError } from '@/errors/giphy/giphyServiceError';
import axios, { AxiosError, Method } from 'axios';

const API_URL = 'https://api.giphy.com';
const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

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
      throw new GiphyServiceError(
        error instanceof AxiosError ? error.message : undefined,
      );
    }

    return response.data;
  }

  async searchGifs({
    limit,
    offset,
    searchText,
  }: {
    limit?: number;
    offset?: number;
    searchText: string;
  }): Promise<GifSearchResult> {
    return this.callApi({
      method: 'GET',
      params: {
        limit,
        offset,
        q: searchText,
      },
      path: '/v1/gifs/search',
    });
  }
}

export const giphyService = new GiphyService();
