---
date: 2025-02-06
isPublished: true
slug: vscode-search
title: "Advanced VSCode Search: Finding Function Calls While Excluding Variable Assignments"
---

# Advanced VSCode Search: Finding Function Calls While Excluding Variable Assignments

As developers, we often need to search through our codebase for specific patterns. One common scenario is finding function calls while filtering out variable assignments. In this post, I'll walk you through creating a powerful VSCode search query that finds `prefetch` function calls while excluding lines that contain assignments.

## The Challenge

Imagine you're working on a large codebase and need to find all the places where `prefetch` functions are being called directly, but you want to exclude cases where the result is being assigned to a variable or an arrow function declaration.. 

You want to find lines like:
```javascript
prefetchData()
await prefetchUser(userId)
this.prefetchCache()
```

But exclude lines like:
```javascript
const data = prefetchData()
let user = await prefetchUser(userId)
this.cache = prefetchCache()
```

## The Solution

Here's the regex pattern that accomplishes this:

```
^(?!.*=).*prefetch.*\(
```

## Breaking Down the Pattern

Let's dissect this regex step by step:

- `^` - Anchors the pattern to the start of the line
- `(?!.*=)` - This is a **negative lookahead** that ensures there's no equal sign (`=`) anywhere on the line
- `.*` - Matches any characters (except newline) before "prefetch"
- `prefetch` - Matches the literal text "prefetch"
- `.*` - Matches any characters between "prefetch" and the opening parenthesis
- `\(` - Matches a literal open parenthesis (escaped because `(` has special meaning in regex)

## How to Use It in VSCode

1. **Open the search panel**: Press `Ctrl+Shift+F` (Windows/Linux) or `Cmd+Shift+F` (Mac)
2. **Enable regex mode**: Click the regex icon (`.*`) in the search box or press `Alt+R`
3. **Enter the pattern**: Type `^(?!.*=).*prefetch.*\(`
4. **Search**: Press Enter to find all matches

## Understanding Negative Lookahead

The key component here is the negative lookahead `(?!.*=)`. This is a powerful regex feature that:

- **Looks ahead** in the string without consuming characters
- **Asserts that what follows doesn't match** the specified pattern
- In our case, it ensures that nowhere on the current line (`.*=`) there's an equal sign

## Real-World Examples

This pattern will match:
```javascript
// ✅ Direct function calls
prefetchData()
await prefetchUser(123)
component.prefetchResources()
this.prefetchCache()

// ✅ Function calls in conditions
if (prefetchData()) {
    // ...
}

// ✅ Function calls as arguments
doSomething(prefetchUser(id))
```

But will exclude:
```javascript
// ❌ Variable assignments
const result = prefetchData()
let user = await prefetchUser(123)
this.data = prefetchCache()

// ❌ Object property assignments
obj.prop = prefetchSomething()
```

## Extending the Pattern

You can easily modify this pattern for other use cases:

### Find any function call (not just prefetch):
```
^(?!.*=).*\w+.*\(
```

### Exclude multiple operators (assignment and comparison):
```
^(?!.*[=<>]).*prefetch.*\(
```

### Case-insensitive search:
Add the `i` flag or use `(?i)` at the beginning:
```
^(?!.*=).*(?i)prefetch.*\(
```

## Tips for Complex Searches

1. **Test your regex**: Use online regex testers like regex101.com to validate your patterns
2. **Use word boundaries**: Add `\b` around words to avoid partial matches
3. **Escape special characters**: Remember to escape characters like `(`, `)`, `[`, `]`, etc.
4. **Save frequent searches**: VSCode allows you to save search queries for reuse



---

*Have you used similar search patterns in your development workflow? Share your favorite VSCode search tips in the comments below!*