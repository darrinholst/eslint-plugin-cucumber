'use strict';

module.exports = function(context) {
  var CALLBACK_NAMES = /^(next|done)$/;

  function isThenStep(node) {
    return node.callee &&
           node.callee.object &&
           node.callee.object.type === 'ThisExpression' &&
           node.callee.property &&
           node.callee.property.name === 'Then';
  }

  function didNotReturnAnythingIn(func) {
    var statements = func.body.body;
    return !statements.length || statements[statements.length - 1].type !== 'ReturnStatement';
  }

  function doesNotHaveCallback(func) {
    return !func.params.length || !CALLBACK_NAMES.exec(func.params[func.params.length - 1].name)
  }

  return {
    'CallExpression': function (node) {
      if (isThenStep(node)) {
        var stepBody = node.arguments[node.arguments.length - 1];

        if (doesNotHaveCallback(stepBody) && didNotReturnAnythingIn(stepBody)) {
          context.report(node.callee.property, 'Then step didn\'t return a promise or have a callback.');
        }
      }
    }
  };
};
