# Babel

Babel is a JavaScript compiler or "transpiler." It is mainly used to convert
ES6 to older versions of JavaScript for compatibility.

In this project, it is used for compatibility reasons with the [Jest](todo) testing framework.

## Plugins

Babel plugins apply code transformations. You can apply plugins or presets to your configuration file.

## Presets

Babel presets can act as sharable sets of Babel plugins and/or configuration options.

For this project, we are using [@babel/preset-env]() for compiling ES2015+ syntax. More on this in the "Configuration" section.

## Configuration

Babel configuration can be done in a file called `babel.config.js` normally.

When using `"type": "module"` in `package.json`, you must name the configuration file `babel.config.cjs` for "common js." See this [StackOverflow post](https://stackoverflow.com/questions/61146112/error-while-loading-config-you-appear-to-be-using-a-native-ecmascript-module-c) for more info.

The basic configuration file only contains the preset to compile ES2015 modules:

```js
// babel.config.cjs
module.exports = {
    presets: [["@babel/preset-env"]],
};
```

## Integration with Jest

We are using Babel primarily to compile testing modules since Jest does not support ES2015+. See detailed configuration details in the [Jest docs](https://jestjs.io/docs/getting-started#using-babel).

To use Babel, we require a few additional dependencies:

```cli
npm install --save-dev @babel/core
```

`babel-jest` is required but is bundled with `jest`.

We then configure Babel to use the current version of Node:

```js
// babel.config.cjs
module.exports = {
    presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```
