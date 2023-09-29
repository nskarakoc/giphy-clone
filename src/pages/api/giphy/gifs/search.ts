import { ErrorResponse } from '@/domains/giphyClone/api/errorResponse';
import { GifSearchRequest } from '@/domains/giphyClone/api/gifSearchRequest';
import { GifSearchResponse } from '@/domains/giphyClone/api/gifSearchResponse';
import { GiphyServiceError } from '@/errors/giphy/giphyServiceError';
import { giphyService } from '@/services/giphyService';
import Logger from '@/util/logger';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GifSearchResponse | ErrorResponse>
) {
  let searchResult;

  try {
    searchResult = await giphyService.searchGifs(req.body as GifSearchRequest);
  } catch (error) {
    if (error instanceof GiphyServiceError) {
      Logger.error('Failed to search for gifs:', error);
      res.status(500).json({
        message: error.message,
        name: error.name,
      });
      return;
    }

    Logger.error(
      'Unknown error occured while searching for gifs:',
      error,
    );
    res.status(500).json({
      message: 'Unknown error occured while searching for gifs',
      name: 'UnknownError',
    });
    return;
  }

  res.status(200).json(searchResult)
}
