
---
date: 2022-08-06
isPublished: true
slug: updating-vite-to-patch-403
tags: ["javascript", "web-development", "tutorial"]
title: Updating from @sveltejs/kit@1.0.0-next.350 to @sveltejs/kit@1.0.0-next.403
---

TLDR: [Here's the commit that I made all code changes in](https://github.com/AndrewUsher/qr-gen/commit/612b7c76710e662f8c9adab22f3753f459f2edb5)

I recently updated the version of sveltekit I'm using for [qr-gen](https://qr-gen-murex.vercel.app/), and it was quite the experience :). There's not much documentation out there (at least that I could find), so I'm documenting what I needed to change here.

## Update dependencies

```sh
yarn add @sveltejs/kit@latest @sveltejs/adapter-auto@latest --exact
```

Note: if you're using any other packages under the `@sveltejs` org, you'll likely need to update those as well.

## Add vite.config.js

Next, I needed to create `vite.config.js` in the root of the repo and add the svelte-kit plugin to the config:

```js
import {sveltekit} from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()]
}

export default config
```

You'll also need to remove any configuration you have under the `kit.vite` property in `svelte.config.js`. [Consulting the vite configuration docs](https://vitejs.dev/config/) should be helpful here.

## Update API Routes to Use Uppercase Method Names

Updating `export const post` to `export const POST` (and so forth for other request methods)

      