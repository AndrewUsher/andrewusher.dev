
---
date: 2022-06-04
isPublished: true
slug: node-err-import-assertion-type-missing
tags: ["node", "javascript", "tutorial"]
title: Resolving ERR_IMPORT_ASSERTION_TYPE_MISSING in Node.js
---

<p>
While working on a CLI, I ran into the below error when trying to import `package.json` to read the package name and version:
</p>

```bash
TypeError [ERR_IMPORT_ASSERTION_TYPE_MISSING]: Module "file:///Users/Andrew.Usher/code/gh/andrewusher/andrewusher.dev/package.json" needs an import assertion of type "json"
```

```js
import pkgInfo from '../package.json'

const { name, version } = pkgInfo

export {
  name,
  version
}
```

<p>
To resolve the issue, we need to use the [import assertions syntax](https://github.com/tc39/proposal-import-assertions) to tell Node that this is a JSON module:
</p>

```
import pkgInfo from '../package.json' assert { type: 'json' }

const { name, version } = pkgInfo

export {
  name,
  version
}
```
      