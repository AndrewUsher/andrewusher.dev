
---
date: 2018-11-29
isPublished: true
slug: recovering-from-a-bad-rebase
tags: ["git", "tutorial"]
title: Recovering From A Bad Rebase
---

So, you were in the middle of a rebase, have encountered one or more conflicts, and you have now decided that it was a big mistake and want to get out of the merge.The fastest way out of the merge is:

```sh
git rebase --abort
```
      