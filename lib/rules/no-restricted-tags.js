const _ = require('lodash');

module.exports = function(context) {
  const TAG_IDENTIFIER = '__CUCUMBER_TAG__';

  const restrictedTags = _.map(context.options, function(tag) {
    if (!tag.match(/^@/)) tag = '@' + tag;
    return tag;
  });

  if (restrictedTags.length === 0) {
    return {};
  }

  return {
    Program: function(node) {
      const tags = getTagsFrom(node.comments);

      if (tags.length) {
        _.each(tags, function(tag) {
          if (_.includes(restrictedTags, tag)) {
            context.report(node, "'{{tag}}' is restricted from being used.", {
              tag: tag
            });
          }
        });
      }
    }
  };

  function getTagsFrom(comments) {
    let tags = [];

    if (
      comments &&
      comments.length === 1 &&
      comments[0].value.match(new RegExp(TAG_IDENTIFIER))
    ) {
      tags = comments[0].value.replace(TAG_IDENTIFIER, '').split(' ');
    }

    return tags;
  }
};
