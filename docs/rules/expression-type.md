# Ensures consistent usage of one type of expression (expression-type)

Your project might have a convention to use either [Cucumber Expressions](https://cucumber.io/docs/cucumber/cucumber-expressions/) or [Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to match steps - but not both.

## Rule Details

This rule allows you to enforce that either Cucumber Expressions (default) or Regular Expressions are used exclusively in your steps.

Examples of **incorrect** code for this rule:

```js
/*eslint cucumber/expression-type: "error"*/

Then(/some step/, function () {
  // step code
});
```

Examples of **correct** code for this rule:

```js
/*eslint cucumber/expression-type: "error"*/

Then("some step", function () {
  // step code
});
```

## Options

The rule has a single option (defaults to "Cucumber") that allows you to specify which type of expression to mandate, whose value can be either "Cucumber" or "RegExp".

Examples of incorrect code for this rule with a sample `"RegExp"` option:

```js
/*eslint cucumber/expression-type: [ "error", "RegExp" ]*/

Then("some step", function () {
  // step code
});
```

## When Not To Use It

When don't mind which type of expression is used in steps.
