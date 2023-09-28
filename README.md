This project is clone of [Giphy](https://giphy.com). It has these features:

- Search gifs by a keyword
- Infinite scrolling

## Getting Started

First, install the dependencies:

```bash
npm install
```

Prepare your [.env.local](.env.local) file. It should look like this:

```text
NEXT_PUBLIC_GIPHY_API_KEY={YOUR_API_KEY}
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Currently this project is not deployed anywhere yet. However, [Serverless Next.js Component](https://github.com/serverless-nextjs/serverless-next.js) can be used to deploy the app into AWS platform.

Another way to deploy the app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Testing

[cypress](https://github.com/cypress-io/cypress) can be used for e2e testing and [jest](https://github.com/jestjs/jest) can be used for unit testing. Follow [these instructions](https://nextjs.org/docs/pages/building-your-application/optimizing/testing) to setup cypress and jest for Next.js.
