# nextjs-contentful-typescript

This is an example repository illustrating how to use Next.js, Contentful and TypeScript together.

Read the blog post for a full tutorial: [Next.js: Integrating Contentful and TypeScript (App Router)](https://maxschmitt.me/posts/nextjs-contentful-typescript)

## Initial Setup

Install dependencies:

```bash
yarn
```

Edit environment variables:

```bash
cp .env.example .env.local
```

## Import Contentful Space

You can import the Contentful space used by this repository via the [Contentful CLI](https://github.com/contentful/contentful-cli).

The content-file is [contentful-space.json](./contentful-space.json).

## Development

To run this application locally, simply run:

```bash
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Generating TypeScript Types from Contentful

TypeScript types can be generated from Contentful by running the following script:

```bash
yarn types
```

This requires the `CONTENTFUL_SPACE_ID` and `CONTENTFUL_MANAGEMENT_TOKEN` environment variables to be configured.
