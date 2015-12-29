'use strict';

var plugin = require('../../../lib/index');
var rule = require('../../../lib/rules/no-restricted-tags');
var RuleTester = require('eslint').RuleTester;

new RuleTester().run("no-restricted-tags", rule, {
  valid: [
    { code: preprocess("@wip"), options: ["foo"]}
  ],
  invalid: [{
    code: preprocess("@wip"), options: ["foo", "wip", "bar"],
    errors: [{ message: "'@wip' is restricted from being used."}]
  }]
});

function preprocess(code) {
  return plugin.processors['.feature'].preprocess(code).join("\n");
}
