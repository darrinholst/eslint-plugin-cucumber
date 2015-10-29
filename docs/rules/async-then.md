# ensures Then steps are asynchronous (async-then)

When using an async heavy tool like protractor you want to ensure that your steps wait for async actions to complete before completing the scenario otherwise you can run through all the steps without ever checking anything.

## Rule Details

This rule aims to force you to either return something (presumably a promise) or provide a callback function in your Then steps.

The following patterns are considered warnings:

```js

this.Then(/some step/, function () {
  expect(foo).to.eventually.eql('doesn\'t matter because it will never be checked');
});

```

The following patterns are not warnings:

```js

this.Then(/some step/, function () {
  return expect(foo).to.eventually.eql('bar');
});

this.Then(/some step/, function (done) {
  expect(foo).to.eventually.eql('bar').notify(done);
});

this.When(/some step/, function () {
  // do anything you want in Whens, we'll wait in the Thens
}

```

## When Not To Use It

When you're not dealing with asynchronous operations
