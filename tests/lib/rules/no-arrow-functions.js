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
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, () => {return "anything";})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.Given(/step/, (done) => {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, (done) => {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.Given(/step/, (next) => {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, (next) => {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.Given(/step/, (callback) => {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, (callback) => {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.Given(/step/, () => {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'Given(/step/, () => {})',
      errors: [
        {
          message: GIVEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, () => {return "anything";})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, () => {return "anything";})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, (done) => {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, (done) => {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, (next) => {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, (next) => {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, (callback) => {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, (callback) => {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.When(/step/, () => {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'When(/step/, () => {})',
      errors: [
        {
          message: WHEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, () => {return "anything";})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, () => {return "anything";})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, (done) => {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, (done) => {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, (next) => {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, (next) => {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, (callback) => {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, (callback) => {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'this.Then(/step/, () => {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    },
    {
      code: 'Then(/step/, () => {})',
      errors: [
        {
          message: THEN_ERROR
        }
      ]
    }
  ]
});
