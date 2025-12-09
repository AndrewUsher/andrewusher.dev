
---
date: 2019-01-22
isPublished: true
slug: react-aha-moments
tags: ["react", "javascript", "web-development"]
title: React Aha Moments
---

- How using immutable objects as props can make `shouldComponentUpdate` super fast for pure components, even when you need complicated hierarchical objects
- That `render` function is called before `componentDidMount`
- You don't need to have any data-flow package (flux, redux, mobx, etc) unless your components need to share state
- Your UI is a function of your state
- That when two components need to share state I need to lift it up instead of trying to keep their states in sync
- Components don’t necessarily have to correspond to DOM nodes
      