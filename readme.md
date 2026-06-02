### THIS IS VERY WIP. It is not released YET!

# Lighthouse Wrapper

A small Fastify-based web app for running Lighthouse audits from a browser interface.

This project wraps the Lighthouse Node API behind a server-side audit flow, with a Nunjucks frontend, a Sass/esbuild asset pipeline, and a small queue/worker model for processing submitted URLs.

## Features

- Submit one or more URLs through a web form
- Run Lighthouse audits from the server
- Store audit work in an in-memory job map
- Process URLs through a queue/worker abstraction
- Render pages with Nunjucks templates
- Build frontend assets with Sass and esbuild
- Use shared classes for reusable models like queues, workers, modals, and IDs

## Tech Stack

- Node.js with ES modules
- Fastify
- Nunjucks
- Lighthouse
- Sass
- esbuild

## Getting Started

Install dependencies:

```sh
npm install
```

Build frontend assets:

```sh
npm run build
```

Start the server:

```sh
npm start
```

For development with Node watch mode:

```sh
npm run dev
```

The server uses port `3000` by default.

```txt
http://localhost:3000
```

You can override the port with the `PORT` environment variable.

## Asset Commands

Build everything:

```sh
npm run build
```

Build Sass only:

```sh
npm run build:css
```

Build JavaScript only:

```sh
npm run build:js
```

Watch assets:

```sh
npm run watch
```

## Current Audit Flow

The main audit flow starts from the home page form.

1. The user submits a list of URLs.
2. The `/audits` route parses and normalizes the submitted URLs.
3. A `Queue` instance stores the URLs and hands them out one at a time.
4. One or more `Worker` instances claim jobs from the queue.
5. Each worker runs Lighthouse for the URL it claimed.
6. Results are pushed back into the queue.

The queue owns the job cursor. Workers do not split the URL list themselves. They simply ask the queue for the next available job.

## Status

###Work in progress.