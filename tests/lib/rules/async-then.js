const rule = require('../../../lib/rules/async-then');
const RuleTester = require('eslint').RuleTester;

const tester = new RuleTester({parserOptions: {ecmaVersion: '2017'}});

tester.run('async-then', rule, {
  valid: [
    // no options provided, just check `Then`s
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
    'When(/step/, function () {})',
    'this.Before(/step/, function () {})',
    'Before(/step/, function () {})',
    'this.BeforeAll(/step/, function () {})',
    'BeforeAll(/step/, function () {})',
    'this.After(/step/, function () {})',
    'After(/step/, function () {})',
    'this.AfterAll(/step/, function () {})',
    'AfterAll(/step/, function () {})',

    // words specified in options
    {
      code: 'Given(/step/, async function () {})',
      options: [{words: ['Given', 'When']}]
    },
    {
      code: 'When(/step/, async function () {})',
      options: [{words: ['Given', 'When']}]
    },
    {
      code: 'Then(/step/, function () {})',
      options: [{words: ['Given', 'When']}]
    },
    {
      code: 'Before(/step/, function () {})',
      options: [{words: ['Given', 'When']}]
    },
    {
      code: 'BeforeAll(/step/, function () {})',
      options: [{words: ['Given', 'When']}]
    },
    {
      code: 'After(/step/, function () {})',
      options: [{words: ['Given', 'When']}]
    },
    {
      code: 'AfterAll(/step/, function () {})',
      options: [{words: ['Given', 'When']}]
    },

    // all words option
    {code: 'Given(/step/, async function () {})', options: [{all: true}]},
    {code: 'When(/step/, async function () {})', options: [{all: true}]},
    {code: 'Then(/step/, async function () {})', options: [{all: true}]},
    {code: 'Before(/step/, async function () {})', options: [{all: true}]},
    {code: 'BeforeAll(/step/, async function () {})', options: [{all: true}]},
    {code: 'After(/step/, async function () {})', options: [{all: true}]},
    {code: 'AfterAll(/step/, async function () {})', options: [{all: true}]}
  ],

  invalid: [
    // no options provided, just check `Then`s
    {
      code: 'this.Then(/step/, function () {})',
      errors: [
        {
          message:
            'Then implementation should be async; use an async function, return a promise, or have a callback'
        }
      ]
    },
    {
      code: 'Then(/step/, function () {})',
      errors: [
        {
          message:
            'Then implementation should be async; use an async function, return a promise, or have a callback'
        }
      ]
    },

    // words specified in options
    {
      code: 'Given(/step/, function () {})',
      errors: [
        {
          message:
            'Given implementation should be async; use an async function, return a promise, or have a callback'
        }
      ],
      options: [{words: ['Given', 'When']}]
    },
    {
      code: 'When(/step/, function () {})',
      errors: [
        {
          message:
            'When implementation should be async; use an async function, return a promise, or have a callback'
        }
      ],
      options: [{words: ['Given', 'When']}]
    },

    // all words option
    {
      code: 'Given(/step/, function () {})',
      errors: [
        {
          message:
            'Given implementation should be async; use an async function, return a promise, or have a callback'
        }
      ],
      options: [{all: true}]
    },
    {
      code: 'When(/step/, function () {})',
      errors: [
        {
          message:
            'When implementation should be async; use an async function, return a promise, or have a callback'
        }
      ],
      options: [{all: true}]
    },
    {
      code: 'Then(/step/, function () {})',
      errors: [
        {
          message:
            'Then implementation should be async; use an async function, return a promise, or have a callback'
        }
      ],
      options: [{all: true}]
    },
    {
      code: 'Before(/step/, function () {})',
      errors: [
        {
          message:
            'Before implementation should be async; use an async function, return a promise, or have a callback'
        }
      ],
      options: [{all: true}]
    },
    {
      code: 'BeforeAll(/step/, function () {})',
      errors: [
        {
          message:
            'BeforeAll implementation should be async; use an async function, return a promise, or have a callback'
        }
      ],
      options: [{all: true}]
    },
    {
      code: 'After(/step/, function () {})',
      errors: [
        {
          message:
            'After implementation should be async; use an async function, return a promise, or have a callback'
        }
      ],
      options: [{all: true}]
    },
    {
      code: 'AfterAll(/step/, function () {})',
      errors: [
        {
          message:
            'AfterAll implementation should be async; use an async function, return a promise, or have a callback'
        }
      ],
      options: [{all: true}]
    }
  ]
});
