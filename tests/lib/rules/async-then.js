'use strict';

var rule = require('../../../lib/rules/async-then');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();

ruleTester.run('async-then', rule, {

  valid: [
    'this.Then(/step/, function () {return "anything";})',
    'this.Then(/step/, function (done) {})',
    'this.Then(/step/, function (next) {})',
    'this.Given(/step/, function () {})',
    'this.When(/step/, function () {})'
  ],

  invalid: [
    {
      code: 'this.Then(/step/, function () {})',
      errors: [{
        message: 'Then step didn\'t return a promise or have a callback.',
      }]
    }
  ]
});
