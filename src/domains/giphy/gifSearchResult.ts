import { Gif } from './gif';
import { Meta } from './meta';
import { Pagination } from './pagination';

export type GifSearchResult = {
  data: Gif[];
  meta: Meta;
  pagination: Pagination;
};
