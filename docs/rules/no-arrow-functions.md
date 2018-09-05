# Disallow arrow functions on cucumber steps (no-arrow-functions)

When passing `World` and other objects via `this` you can run into issue with using arrow functions. 
This rule catches any use of arrow functions to prevent errors caused by these objects being undefined on the `this` instance inside the step definition.

## Rule Details

This rule aims to catch any use of arrow functions when creating step definitions.

The following patterns are considered warnings:

```js

Given(/some step/, () => {
  this.currentEnvironment.username = 'Dr. Acula';
});

Given(/some step/, (done) => {
  this.currentEnvironment.username = 'Dr. Acula';
});

Given(/some step/, (next) => {
  this.currentEnvironment.username = 'Dr. Acula';
});

Given(/some step/, (callback) => {
  this.currentEnvironment.username = 'Dr. Acula';
});

```

The following patterns are not warnings:

```js

Given(/some step/, function () {
   this.currentEnvironment.username = 'Dr. Acula'; 
});

Given(/some step/, function (done) {
   this.currentEnvironment.username = 'Dr. Acula'; 
});

Given(/some step/, function (next) {
   this.currentEnvironment.username = 'Dr. Acula'; 
});

Given(/some step/, function (callback) {
   this.currentEnvironment.username = 'Dr. Acula'; 
});

```

## When Not To Use It

When you're not using `this` to pass in objects between steps.
