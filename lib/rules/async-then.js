const CALLBACK_NAMES = /^(next|done|callback)$/;
const ALL_WORDS = [
  'Given',
  'When',
  'Then',
  'Before',
  'BeforeAll',
  'After',
  'AfterAll'
];

function getMatchedStepOrHook(node, targetWords) {
  return (
    getCucumberOneMatchedStepOrHook(node, targetWords) ||
    getCucumberTwoPlusMatchedStepOrHook(node, targetWords)
  );
}

function getCucumberOneMatchedStepOrHook(node, targetWords) {
  if (
    node.callee &&
    node.callee.object &&
    node.callee.object.type === 'ThisExpression' &&
    node.callee.property &&
    targetWords.indexOf(node.callee.property.name) !== -1
  ) {
    return node.callee.property.name;
  } else {
    return false;
  }
}

function getCucumberTwoPlusMatchedStepOrHook(node, targetWords) {
  if (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    targetWords.indexOf(node.callee.name) !== -1
  ) {
    return node.callee.name;
  } else {
    return false;
  }
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

function isAsyncFunction(func) {
  return !!func.async;
}

function getTargetWords(context) {
  if (context.options.length) {
    const optionsObj = context.options[0];
    if (optionsObj.all) {
      return ALL_WORDS;
    }
    if (optionsObj.words) {
      return optionsObj.words;
    }
  }
  return ['Then'];
}

module.exports = {
  meta: {
    schema: [
      {
        type: 'object',
        properties: {
          all: {
            type: 'boolean'
          },
          words: {
            type: 'array',
            items: {
              type: 'string'
            },
            uniqueItems: true
          }
        }
      }
    ]
  },

  create: function(context) {
    const targetWords = getTargetWords(context);
    return {
      CallExpression: function(node) {
        const matchedStepOrHook = getMatchedStepOrHook(node, targetWords);
        if (matchedStepOrHook) {
          const stepBody = node.arguments[node.arguments.length - 1];
          if (isAsyncFunction(stepBody)) {
            return;
          }
          if (
            doesNotHaveCallback(stepBody) &&
            didNotReturnAnythingIn(stepBody)
          ) {
            context.report(
              node.callee.property || node.callee,
              `${matchedStepOrHook} implementation should be async; use an async function, return a promise, or have a callback`
            );
          }
        }
      }
    };
  }
};
