# eslint-plugin-cucumber

[![NPM](https://nodei.co/npm/eslint-plugin-cucumber.png)](https://nodei.co/npm/eslint-plugin-cucumber/)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-cucumber`:

```
$ npm install eslint-plugin-cucumber --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-cucumber` globally.

## Usage

Add `cucumber` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "cucumber"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "cucumber/async-then": 2,
        "cucumber/no-restricted-tags": [2, "wip", "broken", "foo"],
        "no-arrow-functions": 2
    }
}
```

## Supported Rules

| Name               | Description                                                                                                         |
| -------------      | -------------                                                                                                       |
| async-then         | If you assume asynchronous steps then your Then steps should either return a promise or provide a callback function |
| no-restricted-tags | Restrict usage of specified tags                                                                                    |
| no-arrow-functions | Restrict usage of arrow functions on step definitions                                                               |

## For Maintainers

#### Releasing

1. bump version
1. `npm publish`
1. tag release (`git tag vx.x.x && git push origin master --tags`)
1. build github release (`npx release`)
