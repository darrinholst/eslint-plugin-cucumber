# Ensures step/hook implementations are asynchronous (async-then)

When using an async heavy tool like protractor you want to ensure that your steps and/or hooks wait for async actions to complete before completing the scenario otherwise you can run through all the steps without ever checking anything.

## Rule Details

This rule aims to force you to either return something (presumably a promise) or provide a callback function in your steps and/or hooks (by default, just `Then`s) - or use an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

The following patterns are considered warnings:

```js

Then(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});

```

The following patterns are not warnings:

```js

Then(/some step/, function () {
  return expect(foo).to.eventually.eql('bar');
});

Then(/some step/, function (done) {
  expect(foo).to.eventually.eql('bar').notify(done);
});

Then(/some step/, async function () {
  // anything, since async functions implicitly return a promise
});

When(/some step/, function () {
  // do anything you want in Whens, we'll wait in the Thens
});

```

## Options

By default, only calls to `Then` are checked.

The rule has an object option where you can override this:

- `"all"` - a boolean, if `true` then all supported step/hook words will be checked (`Given`, `When`, `Then`, `Before`, `BeforeAll`, `After`, `AfterAll`)
- `"words"`- an array of strings, denoting which step/hook words to check

Examples of additional **incorrect** code for this rule with a sample `{ "all": true }` option:

```js
/*eslint cucumber/async-then: ["error", { "all": true }] */

Given(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});

When(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});

Before(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});

BeforeAll(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});

After(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});

AfterAll(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});
```

Examples of additional **incorrect** code for this rule with a sample `{ "words": [ "Given", "When", "Then" ] }` option:

```js
/*eslint cucumber/async-then: ["error", { "words": [ "Given", "When", "Then" ] }] */

Given(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});

When(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});

Then(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});
```

## When Not To Use It

When you're not dealing with asynchronous operations
