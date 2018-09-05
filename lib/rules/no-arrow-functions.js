'use strict';

/**
 * @fileoverview Disallow arrow functions as arguments to Cucumber globals
 * @author Colin Wren, adapted from Paul Melnikow's work on eslint-plugin-mocha/no-mocha-arrows
 */

module.exports = function(context) {
  const sourceCode = context.getSourceCode();

  function isGivenStep(node) {
    return isCucumberOneStep(node, 'Given') || isCucumberTwoStep(node, 'Given');
  }

  function isWhenStep(node) {
    return isCucumberOneStep(node, 'When') || isCucumberTwoStep(node, 'When');
  }

  function isThenStep(node) {
    return isCucumberOneStep(node, 'Then') || isCucumberTwoStep(node, 'Then');
  }

  function isStep(node) {
    return isGivenStep(node) || isWhenStep(node) || isThenStep(node);
  }

  function isCucumberOneStep(node, stepName) {
    return (
      node.callee &&
      node.callee.object &&
      node.callee.object.type === 'ThisExpression' &&
      node.callee.property &&
      node.callee.property.name === stepName
    );
  }

  function isCucumberTwoStep(node, stepName) {
    return (
      node.type === 'CallExpression' &&
      node.callee &&
      node.callee.type === 'Identifier' &&
      node.callee.name === stepName
    );
  }

  function formatFunctionHead(fn) {
    const paramsLeftParen = sourceCode.getFirstToken(fn);
    const paramsRightParen = sourceCode.getTokenBefore(
      sourceCode.getTokenBefore(fn.body)
    );
    let paramsFullText = sourceCode.text.slice(
      paramsLeftParen.range[0],
      paramsRightParen.range[1]
    );
    let functionKeyword = 'function';

    if (fn.async) {
      // When 'async' specified, take care about the keyword.
      functionKeyword = 'async function';
      // Strip 'async (...)' to ' (...)'
      paramsFullText = paramsFullText.slice(5);
    }

    if (fn.params.length > 0) {
      paramsFullText = `(${sourceCode.text.slice(
        fn.params[0].start,
        fn.params[fn.params.length - 1].end
      )})`;
    }

    return `${functionKeyword}${paramsFullText} `;
  }

  function fixArrowFunction(fixer, fn) {
    if (fn.body.type === 'BlockStatement') {
      // When it((...) => { ... }),
      // simply replace '(...) => ' with 'function () '
      return fixer.replaceTextRange(
        [fn.start, fn.body.start],
        formatFunctionHead(fn)
      );
    }

    const bodyText = sourceCode.text.slice(fn.body.range[0], fn.body.range[1]);
    return fixer.replaceTextRange(
      [fn.start, fn.end],
      `${formatFunctionHead(fn)}{ return ${bodyText}; }`
    );
  }

  return {
    CallExpression(node) {
      const name =
        node.callee && node.callee.property
          ? node.callee.property.name
          : node.callee.name;

      if (isStep(node)) {
        const fnArg = node.arguments.slice(-1)[0];
        if (fnArg && fnArg.type === 'ArrowFunctionExpression') {
          context.report({
            node,
            message: `Do not pass arrow functions to ${name}()`,
            fix(fixer) {
              return fixArrowFunction(fixer, fnArg);
            }
          });
        }
      }
    }
  };
};
