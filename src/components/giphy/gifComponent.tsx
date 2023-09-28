import { Gif } from '@/domains/giphy/gif';
import Image from 'next/image';

export default function GifComponent({ gif }: { gif: Gif }) {
  return (
    <Image
      alt={gif.title}
      src={gif.images.original.url}
      width={parseInt(gif.images.original.width)}
      height={parseInt(gif.images.original.height)}
    />
  );
}
