# Babel

Babel is a JavaScript compiler or "transpiler." It is mainly used to convert
ES6 to older versions of JavaScript for compatibility.

In this project, it is used for compatibility reasons with the [Jest](todo) testing framework.

## Plugins

Babel plugins apply code transformations. You can apply plugins or presets to your configuration file.

## Presets

Babel presets can act as sharable sets of Babel plugins and/or configuration options.

For this project, we are using [@babel/preset-env]() for compiling ES2015+ syntax

```json
// babel.config.js
"babel": {
    "presets": [
        [
            "@babel/preset-env"
        ]
    ]
}
```

## Integration with Jest

https://jestjs.io/docs/getting-started#using-babel

## Configuration

When using `"type": "module"` in `package.json`, you must name the configuration file `babel.config.cjs` for "common js." See this [StackOverflow post](https://stackoverflow.com/questions/61146112/error-while-loading-config-you-appear-to-be-using-a-native-ecmascript-module-c) for more info.
