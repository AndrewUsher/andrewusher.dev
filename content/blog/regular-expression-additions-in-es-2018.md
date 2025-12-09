
---
date: 2018-05-24
isPublished: true
slug: regular-expression-additions-in-es-2018
tags: ["javascript", "web-development"]
title: Regular Expression Additions in ES 2018
---

Javascript has really come a long way in the past couple of years. With the now yearly updates of the language, there is always a lot of new things to learn. Something that is being added in 2018 is major improvements to regular expressions in JavaScript.

If you are a complete beginner to regular expressions, this article can widen your understanding of the practical use of regular expressions. If, however, you do have at least an average knowledge of regular expressions, this article can get you caught up with new capabilities of regular expressions in JS.

## Is Regex Finally Powerful In JS?

It doesn't have everything under the regex sun now, but JS has significantly closed the gap between its own engine and other PCRE-based regex engines. The new updates are geared towards practical use cases:

- Dotall Flag
- Named Capture Groups
- Unicode Escapes
- Lookbehinds

### Dotall Flag

This is a pretty simple update that was added. In Javascript and many other PCRE regular expressions, newline characters like `\n` does not match the dot.

```js
// Newline character does not match dot
const regex = /./.regex.test('\n')
// > false
```

When we test it, the test returns false. However, adding an s flag in ES2018 matches the newline character in addition to the carriage return, line seperator, and paragraph seperator characters:

```js
// Dotall flag
let regex = /./s
regex.test('\n')
// > true
regex.test('\r')
// > true
regex.test('\u2028')
// > true
regex.test('\u2029')
// > true
```

### Named Capture Groups

Suppose you want to get the currency, numeric price value, and total currency in a string of format:

```
Total: $60.00
```

The regular matching this string would look like this:

```js
;/^Total: [€\$]\d\d\.\d\d$/
```

The dolloar sign and dot are escaped because they are metasyntax characters. After adding parentheses to capture the needed values, the regular expression lookis like this:

```js
;/^Total: (([€\$])(\d\d\.\d\d))$/
```

We now have three capture groups to access the data:

- 1: price with currency
- 2: currency symbol
- 3: numeric price

Using the indices 1, 2, and 3 to refer to these capture groups isn't very maintainable. For example, what if price is multilingual, and you have to capture the Total as well:

```js
;/^(Total|Totaal): (([€\$])(\d\d\.\d\d))$/
```

As a result, capture groups 1, 2, and 3 have now become 2, 3, and 4. Code processing these values now have to be rewritten. Enter capture groups:

- &lt;priceWithSymbol&gt;: price with symbol
- &lt;symbol&gt;: currency symbol
- &lt;price&gt;: numeric price

The syntax `<captureGroupName>content` matches `content` in `<captureGroupName>`:

```js
// Capture groups example
const regex = /^Total: (?<priceWithSymbol>(?<symbol>[€\$])(?<price>\d\d\.\d\d))$/
```

In order to create a named capture, all that's needed is to write a question mark after the start of the parentheses, then the capture group name inside greater than and less than symbols.

Now we're done. Let's see the results:

```js
// Named capture groups example
const regex = /^Total: (?<priceWithSymbol>(?<symbol>[€\$])(?<price>\d\d\.\d\d))$/
regex.exec('Total: $60.00').groups
// > {priceWithSymbol: $60.00, symbol: '$', price: '60.00'}
```

Named capture groups make regular expressions more maintainable.

### Unicode Escapes

This new feature is very documentation-heavy since the docs themselves discuss every minute detail in this update. You can use the [documentation](https://github.com/tc39/proposal-regexp-unicode-property-escapes) as a reference. The documentation entails how you can match certain unicode character groups with some expressions without third party libraries. In this section, I'll concentrate on some practical use cases of the addition instead of a thorough walkthrough of all unicode groups.

One use case is matching greek characters. Before ES2018, you would have to create character sets:

```js
// Greek lowercase character set
const greekChars = /[θωερτψυιοπασδφγηςκλζχξωβνμάέήίϊΐόύϋΰώ]/u
greekChars.test('λ')
// > true
```

That doesn't even include uppercase letters:

```js
const uppercaseGreekChars = /[ΘΩΕΡΤΨΥΙΟΠΑΣΔΦΓΗςΚΛΖΧΞΩΒΝΜΆΈΉΊΪΐΌΎΫΰΏ]/u
uppercaseGreekChars.test('Λ')
// > true
```

In ES2018, it's a lot simpler:

```js
// Old way
const greekChars = /[θωερτψυιοπασδφγηςκλζχξωβνμάέήίϊΐόύϋΰώ]/u
const uppercaseGreekChars = /[ΘΩΕΡΤΨΥΙΟΠΑΣΔΦΓΗςΚΛΖΧΞΩΒΝΜΆΈΉΊΪΐΌΎΫΰΏ]/u
// New way
const unicodeEscape = /\p{Script=Greek}/u
unicodeEscape.test('π')
// > true
unicodeEscape.test('ω')
// > true
unicodeEscape.test('Ϋ')
// > true
```

`/\p{Script=Greek}/u` only matches Greek characters, and this is great semantic shorthand. If you think about it, Greek is very much like English in terms of the limited number of characters. In addition, you would have a have a difficult time working in Chinese or Japanese, where you would have to concatenate another endlees pool of symbols. This problem is solved with Unicode escapes in ES2018.

`/\p{Alphabetic}/u` matches any alphabetical character of any language:

```js
// Alphabetic unicode escape
const regex = /\p{Alphabetic}/u
regex.test('á')
// > true
regex.test('が')
// > true
regex.test('6')
// > false
regex.test('π')
// > true
regex.test('ω')
// > true
regex.test('Ϋ')
// > true
```

### Lookbehinds

A lookbehind is the opposite of a lookahead. It walks backwards in the regular expression and checks if the given pattern matches the string before the current position. If a lookbehind match is succesful, the match is reverted.

- Negative lookbehind: (?<!pattern)
- Positive lookbehind: (?<=pattern)

An implicit lookbehind does exist before ES2018, **\b**, the word boundary anchor. So, in practice, you could use word boundaries without lookbehinds. Here are some examples that show this.

**Example 1**: Determine if the string contains a character sequence starting with whimper or whisper:

```js
const regex = /\bwhi[ms]per/
regex.test(string)
```

In the example above, we're looking for the pattern `whi[ms]per` in the string provided. Before the `w` character, the `\b` word boundary anchor filters our results by ensuring a non-whitespace character cannot stand in front of the `w`.

**Example 2**: Here are some examples for negative and positive lookbehinds. `/(?<=e)i/` matches an `i` character if it comes right after an `e` character. The `e` character is not included in the match.

```js
// Positive lookbehind syntax
const regex = /(?<=e)i/
regex.exec('oi')
// > null
regex.exec('ei')
// > {'i', index: 1, input: 'ei', groups: undefined}
```

`/(?<=e)i/` matches an `i` character if it does not come right after an `e`:

```js
// Negative lookbehind syntax
const regex = /(?<=e)i/
regex.exec('oi')
// > {'i', index: 1, input: 'ei', groups: undefined}
regex.exec('ei')
// > null
```
      