import InputComponent from '@/components/generic/inputComponent';
import GifComponent from '@/components/giphy/gifComponent';
import { Gif } from '@/domains/giphy/gif';
import { Pagination } from '@/domains/giphy/pagination';
import { GifSearchResponse } from '@/domains/giphyClone/api/gifSearchResponse';
import Logger from '@/util/logger';
import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function HomePage() {
  const [searchText, setSearchText] = useState('');
  const [gifs, setGifs] = useState<Gif[] | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const searchGifs = useMemo(() => {
    return debounce(
      async ({
        existingGifs,
        limit,
        offset,
        textToSearch,
      }: {
        existingGifs?: Gif[];
        limit?: number;
        offset?: number;
        textToSearch: string;
      }) => {
        let searchResult;

        try {
          Logger.debug(
            'Searching for gifs with text:',
            textToSearch,
            'limit:',
            limit,
            'offset:',
            offset,
          );
          const response = await axios.request<GifSearchResponse>({
            data: {
              limit,
              offset,
              q: textToSearch,
            },
            method: 'POST',
            url: '/api/giphy/gifs/search',
          });
          searchResult = response.data;
          Logger.debug('Search result:', searchResult);
        } catch (error) {
          const e = (error as any).response.data;

          if (e) {
            Logger.error('Failed to search for gifs:', error);
            return;
          }

          Logger.error(
            'Unknown error occured while searching for gifs:',
            error,
          );
          throw error;
        }

        setGifs([...(existingGifs || []), ...searchResult.data]);
        setPagination(searchResult.pagination);
      },
      500,
    );
  }, []);

  useEffect(() => {
    if (!searchText) return;

    (async () => {
      await searchGifs({
        textToSearch: searchText,
      });
    })();
  }, [searchText, searchGifs]);

  useEffect(() => {
    if (!gifs) return;

    Logger.debug('Gif count changed to:', gifs.length);
  }, [gifs]);

  return (
    <div className="px-20 relative">
      <div className="fixed top-5 left-20 right-20">
        <InputComponent
          placeholder="Search GIFs"
          setValue={setSearchText}
          value={searchText}
        />
      </div>
      {gifs && (
        <InfiniteScroll
          dataLength={gifs.length}
          next={async () => {
            if (!pagination) return;

            await searchGifs({
              existingGifs: gifs,
              limit: pagination.count,
              offset: pagination.offset + pagination.count,
              textToSearch: searchText,
            });
          }}
          hasMore={pagination ? pagination.total_count > gifs.length : false}
          loader={<h4>Loading...</h4>}
        >
          <div className="mt-24 mb-5 flex flex-col gap-5 items-center">
            {gifs.map((gif) => (
              <div key={gif.id}>
                <GifComponent gif={gif} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
