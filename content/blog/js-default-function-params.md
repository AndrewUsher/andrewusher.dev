
---
date: 2022-05-07
isPublished: true
slug: js-default-function-params
title: How To Use Default Function Parameter Values In JS
---

Function parameters are undefined by default in JavaScript. Sometimes, you want to define a default parameter in this case. Before [ES6](http://es6-features.org/#Constants) (also known as ES2015), creating default paramaters was a little tedious:

```js
function createName(firstName, lastName) {
  firstName = typeof firstName === 'undefined' ? 'Jane' : firstName;
  secondName = typeof secondName === 'undefined' ? 'Doe' : secondName;

  return firstName + ' ' + secondName;
}

console.log(createName()); // Jane Doe
```

With the introduction of default parameter values in ES6, the above could be simplified to:

```js
function createName(firstName = 'Jane', lastName = 'Doe') {  
  return firstName + ' ' + secondName;
}

console.log(createName()); // Jane Doe
```
      