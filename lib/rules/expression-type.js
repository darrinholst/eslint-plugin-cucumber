const STEP_NAMES = ['Given', 'When', 'Then'];
const EXPRESSION_TYPES = {
  Cucumber: {
    check(expressionNode) {
      return (
        expressionNode.type === 'Literal' &&
        typeof expressionNode.value === 'string'
      );
    },
    message: 'Only Cucumber Expressions should be used to match steps'
  },
  RegExp: {
    check(expressionNode) {
      return expressionNode.type === 'Literal' && !!expressionNode.regex;
    },
    message: 'Only Regular Expressions should be used to match steps'
  }
};

function isStep(node) {
  return isCucumberOneStep(node) || isCucumberTwoPlusStep(node);
}

function isCucumberOneStep(node) {
  return (
    node.callee &&
    node.callee.object &&
    node.callee.object.type === 'ThisExpression' &&
    node.callee.property &&
    STEP_NAMES.indexOf(node.callee.property.name) !== -1
  );
}

function isCucumberTwoPlusStep(node) {
  return (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    STEP_NAMES.indexOf(node.callee.name) !== -1
  );
}

module.exports = {
  meta: {
    schema: [
      {
        type: 'string',
        enum: ['Cucumber', 'RegExp'],
        default: 'Cucumber'
      }
    ]
  },
  create: function(context) {
    const preferredType = context.options[0] || 'Cucumber';
    return {
      CallExpression: function(node) {
        if (isStep(node)) {
          const expressionNode = node.arguments[0];
          if (!EXPRESSION_TYPES[preferredType].check(expressionNode)) {
            context.report(
              expressionNode,
              EXPRESSION_TYPES[preferredType].message
            );
          }
        }
      }
    };
  }
};
