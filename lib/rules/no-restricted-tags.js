'use strict';

var _ = require('lodash');

module.exports = function(context) {
  var TAG_IDENTIFIER = '__CUCUMBER_TAG__';

  var restrictedTags = _.map(context.options, function (tag) {
    if (!tag.match(/^@/)) tag = '@' + tag;
    return tag;
  });

  if (restrictedTags.length === 0) {
    return {};
  }

  return {
    'Program': function(node) {
      var tags = getTagsFrom(node.leadingComments);

      if (tags.length) {
        _.each(tags, function (tag) {
          if (_.includes(restrictedTags, tag)) {
            context.report(node, "'{{tag}}' is restricted from being used.", {tag: tag});
          }
        });
      }
    }
  };

  function getTagsFrom(comments) {
    var tags = [];

    if (comments && comments.length === 1 && comments[0].value.match(new RegExp(TAG_IDENTIFIER))) {
      tags = comments[0].value.replace(TAG_IDENTIFIER, '').split(' ')
    }

    return tags;
  }
};
