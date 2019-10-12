const rule = require('../../../lib/rules/async-then');
const RuleTester = require('eslint').RuleTester;

const tester = new RuleTester({parserOptions: {ecmaVersion: '2017'}});

tester.run('async-then', rule, {
  valid: [
    'this.Then(/step/, async function () {})',
    'Then(/step/, async function () {})',
    'this.Then(/step/, function () {return "anything";})',
    'Then(/step/, function () {return "anything";})',
    'this.Then(/step/, function (done) {})',
    'Then(/step/, function (done) {})',
    'this.Then(/step/, function (next) {})',
    'Then(/step/, function (next) {})',
    'this.Then(/step/, function (callback) {})',
    'Then(/step/, function (callback) {})',
    'this.Given(/step/, function () {})',
    'Given(/step/, function () {})',
    'this.When(/step/, function () {})',
    'When(/step/, function () {})'
  ],

  invalid: [
    {
      code: 'this.Then(/step/, function () {})',
      errors: [
        {
          message: "Then step didn't return a promise or have a callback."
        }
      ]
    },
    {
      code: 'Then(/step/, function () {})',
      errors: [
        {
          message: "Then step didn't return a promise or have a callback."
        }
      ]
    }
  ]
});
