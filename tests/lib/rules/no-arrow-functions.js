const rule = require('../../../lib/rules/no-arrow-functions');
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017
  }
});

const GIVEN_ERROR = 'Do not pass arrow functions to Given()';
const WHEN_ERROR = 'Do not pass arrow functions to When()';
const THEN_ERROR = 'Do not pass arrow functions to Then()';

ruleTester.run('no-arrow-functions', rule, {
  valid: [
    'this.Given(/step/, function () {return "anything";})',
    'Given(/step/, function () {return "anything";})',
    'this.Given(/step/, function (done) {})',
    'Given(/step/, function (done) {})',
    'this.Given(/step/, function (next) {})',
    'Given(/step/, function (next) {})',
    'this.Given(/step/, function (callback) {})',
    'Given(/step/, function (callback) {})',
    'this.When(/step/, function () {return "anything";})',
    'When(/step/, function () {return "anything";})',
    'this.When(/step/, function (done) {})',
    'When(/step/, function (done) {})',
    'this.When(/step/, function (next) {})',
    'When(/step/, function (next) {})',
    'this.When(/step/, function (callback) {})',
    'When(/step/, function (callback) {})',
    'this.Then(/step/, function () {return "anything";})',
    'Then(/step/, function () {return "anything";})',
    'this.Then(/step/, function (done) {})',
    'Then(/step/, function (done) {})',
    'this.Then(/step/, function (next) {})',
    'Then(/step/, function (next) {})',
    'this.Then(/step/, function (callback) {})',
    'Then(/step/, function (callback) {})'
  ],
  invalid: [
    {
      code: 'this.Given(/step/, () => {return "anything";})',
      output: 'this.Given(/step/, function() {return "anything";})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, () => {return "anything";})',
      output: 'Given(/step/, function() {return "anything";})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.Given(/step/, (done) => {})',
      output: 'this.Given(/step/, function(done) {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, (done) => {})',
      output: 'Given(/step/, function(done) {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.Given(/step/, (next) => {})',
      output: 'this.Given(/step/, function(next) {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, (next) => {})',
      output: 'Given(/step/, function(next) {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.Given(/step/, (callback) => {})',
      output: 'this.Given(/step/, function(callback) {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, (callback) => {})',
      output: 'Given(/step/, function(callback) {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.Given(/step/, () => {})',
      output: 'this.Given(/step/, function() {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, () => {})',
      output: 'Given(/step/, function() {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, () => {return "anything";})',
      output: 'this.When(/step/, function() {return "anything";})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, () => {return "anything";})',
      output: 'When(/step/, function() {return "anything";})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, (done) => {})',
      output: 'this.When(/step/, function(done) {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, (done) => {})',
      output: 'When(/step/, function(done) {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, (next) => {})',
      output: 'this.When(/step/, function(next) {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, (next) => {})',
      output: 'When(/step/, function(next) {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, (callback) => {})',
      output: 'this.When(/step/, function(callback) {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, (callback) => {})',
      output: 'When(/step/, function(callback) {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, () => {})',
      output: 'this.When(/step/, function() {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, () => {})',
      output: 'When(/step/, function() {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, () => {return "anything";})',
      output: 'this.Then(/step/, function() {return "anything";})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, () => {return "anything";})',
      output: 'Then(/step/, function() {return "anything";})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, (done) => {})',
      output: 'this.Then(/step/, function(done) {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, (done) => {})',
      output: 'Then(/step/, function(done) {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, (next) => {})',
      output: 'this.Then(/step/, function(next) {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, (next) => {})',
      output: 'Then(/step/, function(next) {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, (callback) => {})',
      output: 'this.Then(/step/, function(callback) {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, (callback) => {})',
      output: 'Then(/step/, function(callback) {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, () => {})',
      output: 'this.Then(/step/, function() {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, () => {})',
      output: 'Then(/step/, function() {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    }
  ]
});
