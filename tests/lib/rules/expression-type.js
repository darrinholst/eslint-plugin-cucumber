const rule = require('../../../lib/rules/expression-type');
const RuleTester = require('eslint').RuleTester;

const tester = new RuleTester({parserOptions: {ecmaVersion: '2017'}});

tester.run('expression-type', rule, {
  valid: [
    // no option specified - default to cucumber
    'this.Given("step", function () {})',
    'Given("step", function () {})',
    'this.Then("step", function () {})',
    'Then("step", function () {})',
    'this.When("step", function () {})',
    'When("step", function () {})',

    // cucumber option
    {code: 'Given("step", function () {})', options: ['Cucumber']},
    {code: 'Then("step", function () {})', options: ['Cucumber']},
    {code: 'When("step", function () {})', options: ['Cucumber']},

    // regex option
    {code: 'Given(/step/, function () {})', options: ['RegExp']},
    {code: 'Then(/step/, function () {})', options: ['RegExp']},
    {code: 'When(/step/, function () {})', options: ['RegExp']}
  ],

  invalid: [
    // no option specified - default to cucumber
    {
      code: 'this.Given(/step/, function () {})',
      errors: [
        {
          message: 'Only Cucumber Expressions should be used to match steps'
        }
      ]
    },
    {
      code: 'Given(/step/, function () {})',
      errors: [
        {
          message: 'Only Cucumber Expressions should be used to match steps'
        }
      ]
    },
    {
      code: 'this.When(/step/, function () {})',
      errors: [
        {
          message: 'Only Cucumber Expressions should be used to match steps'
        }
      ]
    },
    {
      code: 'When(/step/, function () {})',
      errors: [
        {
          message: 'Only Cucumber Expressions should be used to match steps'
        }
      ]
    },
    {
      code: 'this.Then(/step/, function () {})',
      errors: [
        {
          message: 'Only Cucumber Expressions should be used to match steps'
        }
      ]
    },
    {
      code: 'Then(/step/, function () {})',
      errors: [
        {
          message: 'Only Cucumber Expressions should be used to match steps'
        }
      ]
    },

    // cucumber option
    {
      code: 'Given(/step/, function () {})',
      errors: [
        {
          message: 'Only Cucumber Expressions should be used to match steps'
        }
      ],
      options: ['Cucumber']
    },
    {
      code: 'When(/step/, function () {})',
      errors: [
        {
          message: 'Only Cucumber Expressions should be used to match steps'
        }
      ],
      options: ['Cucumber']
    },
    {
      code: 'Then(/step/, function () {})',
      errors: [
        {
          message: 'Only Cucumber Expressions should be used to match steps'
        }
      ],
      options: ['Cucumber']
    },

    // regexp option
    {
      code: 'Given("step", function () {})',
      errors: [
        {
          message: 'Only Regular Expressions should be used to match steps'
        }
      ],
      options: ['RegExp']
    },
    {
      code: 'When("step", function () {})',
      errors: [
        {
          message: 'Only Regular Expressions should be used to match steps'
        }
      ],
      options: ['RegExp']
    },
    {
      code: 'Then("step", function () {})',
      errors: [
        {
          message: 'Only Regular Expressions should be used to match steps'
        }
      ],
      options: ['RegExp']
    }
  ]
});
