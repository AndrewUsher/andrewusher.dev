
---
date: 2021-02-06
isPublished: true
slug: use-window-size
tags: ["react", "javascript", "tutorial"]
title: useWindowSize
---

A really common need is to get the current size of the browser window. This hook returns an object containing the window's width and height. If executed server-side (no window object) the value of width and height will be undefined.

```jsx
import { useState, useEffect } from 'react'

const Example = () => {
  const { height, width } = useWindowSize()

  return (
    <div>
      {width}px / {height}px
    </div>
  )
}

// Hook
function useWindowSize() {
  const isBrowser = typeof window !== 'undefined'

  const getSize = () => ({
    width: isBrowser ? window.innerWidth : undefined,
    height: isBrowser ? window.innerHeight : undefined,
  })

  const handleResize = () => {
    setWindowSize(getSize())
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isBrowser) return
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
```
      