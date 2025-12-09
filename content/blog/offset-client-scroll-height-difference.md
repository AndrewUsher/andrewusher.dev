---
date: 2022-05-22
isPublished: true
slug: offset-client-scroll-height-difference
tags: ["javascript", "web-development", "tutorial"]
title: "offsetHeight/scrollHeight/clientHeight: What's The Difference?"
---

While working on a scrolling progress bar for my portfolio site, I ran into some issues trying to find out the small differences between `offsetHeight`, `clientHeight`, and `scrollHeight` on a given element. Here's a brief description of each one:

## clientHeight

`clientHeight` can be calculated as: CSS height + CSS padding - height of horizontal scrollbar (if present)

## scrollHeight

The `scrollHeight` value is equal to the minimum height the element would require in order to fit all the content in the viewport without using a vertical scrollbar. The height is measured in the same way as clientHeight: it includes the element's padding, but not its border, margin or horizontal scrollbar (if present)

## offsetHeight

`offsetHeight` is a measurement in pixels of the element's CSS height, including any borders, padding, and horizontal scrollbars (if rendered). It does not include the height of pseudo-elements such as ::before or ::after
