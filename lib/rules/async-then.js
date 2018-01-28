module.exports = function(context) {
  const CALLBACK_NAMES = /^(next|done)$/;

  function isThenStep(node) {
    return isCucumberOneThenStep(node) || isCucumberTwoPlusThenStep(node);
  }

  function isCucumberOneThenStep(node) {
    return (
      node.callee &&
      node.callee.object &&
      node.callee.object.type === 'ThisExpression' &&
      node.callee.property &&
      node.callee.property.name === 'Then'
    );
  }

  function isCucumberTwoPlusThenStep(node) {
    return (
      node.type === 'CallExpression' &&
      node.callee &&
      node.callee.type === 'Identifier' &&
      node.callee.name === 'Then'
    );
  }

  function didNotReturnAnythingIn(func) {
    const statements = func.body.body;
    return (
      !statements.length ||
      statements[statements.length - 1].type !== 'ReturnStatement'
    );
  }

  function doesNotHaveCallback(func) {
    return (
      !func.params.length ||
      !CALLBACK_NAMES.exec(func.params[func.params.length - 1].name)
    );
  }

  return {
    CallExpression: function(node) {
      if (isThenStep(node)) {
        const stepBody = node.arguments[node.arguments.length - 1];

        if (doesNotHaveCallback(stepBody) && didNotReturnAnythingIn(stepBody)) {
          context.report(
            node.callee.property || node.callee,
            "Then step didn't return a promise or have a callback."
          );
        }
      }
    }
  };
};
