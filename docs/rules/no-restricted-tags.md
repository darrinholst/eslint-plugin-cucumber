# Disallow restricted tags (no-restricted-tags)

Disallowing usage of certain tags used in the development cycle can help ensure your build is running the scenarios you think it is.

## Rule Details

This rule allows you to specify tags that you don't want to use in your feature files.

### Options

The syntax to specify restricted tags looks like this:

```json
"cucumber/no-restricted-tags": [2, <...tags>]
```

The following patterns are considered problems:

```cucumber
#eslint cucumber/no-restricted-tags: [2, "wip"]*/

@wip
Feature: Some Feature
```

The following patterns are not considered problems:

```cucumber
#eslint cucumber/no-restricted-tags: [2, "wip"]*/

@performance
Feature: Some Feature
```
