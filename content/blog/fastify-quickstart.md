
---
date: 2022-01-05
isPublished: true
slug: fastify-quickstart
title: A Fastify Quickstart
---

This post will cover instantiating a basic server using [`fastify`](https://github.com/fastify/fastify).

## Getting Started

First, we'll need to setup a new folder for this project. Open up a terminal, and type these commands to get setup.

```sh
mkdir fastify-quickstart
cd fastify-quickstart
npm init -y
```

## Installing Fastify

After that, we need to install `fastify` with the below command:

```sh
npm i fastify
```

## TLDR: The Code

For some quick code to copy and paste, the snippet below will be enough to get you started:

```js
// server.js
const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {
  return {
    message: 'Hello World!'
  }
})

const startServer = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

startServer()
```

To run the server now, type `node server.js` in your terminal.

You can test that things are working as expected by running `curl` in your terminal.

```
> curl http://localhost:3000
{"message":"Hello World!"} 
```

For more info on additional methods, configuration, etc., [take a look at the Fastify documentation!](https://www.fastify.io/docs/latest/)

      