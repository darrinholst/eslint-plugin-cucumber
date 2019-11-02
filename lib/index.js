const _ = require('lodash');

module.exports = {
  rules: {
    'async-then': require('./rules/async-then'),
    'expression-type': require('./rules/expression-type'),
    'no-restricted-tags': require('./rules/no-restricted-tags'),
    'no-arrow-functions': require('./rules/no-arrow-functions')
  },

  processors: {
    '.feature': {
      preprocess: function(text, filename) {
        return _.map(text.split('\n'), function(line) {
          if (line.trim().match(/^@/)) {
            return '/*__CUCUMBER_TAG__' + line.trim() + '*/';
          } else {
            return '';
          }
        });
      },

      postprocess: function(messages, filename) {
        return _.filter(_.flatten(messages), function(message) {
          return message.ruleId.match(/^cucumber/);
        });
      }
    }
  }
};
