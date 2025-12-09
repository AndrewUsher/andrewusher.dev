
---
date: 2021-08-14
isPublished: true
slug: web-pointer-events
tags: ["javascript", "web-development"]
title: Web Pointer Events
---

Pointing at things on the web used to be simple. You had a mouse, you moved it around, sometimes you pushed buttons, and that was it. But this, doesn't work so well on here.

Touch events are good, but to support [touch](https://www.w3.org/TR/touch-events/) and [mouse](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent), you had to support two event models:

```js
elem.addEventListener('mousemove', mouseMoveEvent);
elem.addEventListener('touchmove', touchMoveEvent);
```

Chrome now enables unified input handling by dispatching [PointerEvents](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent):

```js
elem.addEventListener('pointermove', pointerMoveEvent);
```

Pointer events unify the pointer input model for the browser, bringing touch, pens, and mice together into a single set of events. They're supported in [IE11, Edge, Chrome, Opera and partially supported in Firefox](https://caniuse.com/pointer).

<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/image/pointer.webp">
<source type="image/png" srcset="https://caniuse.bitsofco.de/image/pointer.png">
<img src="https://caniuse.bitsofco.de/image/pointer.jpg" alt="Data on support for the pointer feature across the major browsers from caniuse.com">
</picture>
      