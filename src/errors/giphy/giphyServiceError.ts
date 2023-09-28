export class GiphyServiceError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'GiphyServiceError';
  }
}
