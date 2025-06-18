---
date: 2018-10-19
isPublished: true
slug: set-state-a-function
title: 'setState: a function??'
---

Components in React are independent and reusable pieces of code that often contain their own state. They return React elements that make up the UI of an application. Components that contain local state have a property called state When we want to change our how application looks or behaves, we need to change our component’s state. So, how do we update the state of our component? React components have a method available to them called setState Calling this.setState causes React to re-render your application and update the DOM.

Normally, when we want to update our component we just call setState with a new value by passing in an object to the setState function:

```js
this.setState({ someField: someValue })
```

But, often there is a need to update our component’s state using the current state of the component. Directly accessing this.state to update our component is not a reliable way to update our component’s next state. From the React documentation:

> Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.

The key word from that documentation is **asynchronously**. Updates to the DOM don’t happen immediately when `this.setState` is called. React batches updates so elements are re-rendered to the DOM efficiently.

### Function in setState!

Instead of passing in an object to this.setState we can pass in a function and reliably get the value of the current state of our component:

```js
this.setState((prevState) => ({
  someBool: !prevState.someBool,
}))
```

Passing in a function into setState instead of an object will give you a reliable value for your component’s state and props. If you know you’re going to use setState to update your component and you know you’re going to need the current state or the current props of your component to calculate the next state, passing in a function as the first parameter of this.setState instead of an object is the recommended solution.
