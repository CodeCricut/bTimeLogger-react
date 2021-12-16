# React State Management

Quick links:

-   [Explicitly Pass Data to Components](#explicitly-pass-data-to-components)
-   [Context API](#context-api) - quick overview of the React Context API as used in the app
    -   [Creating a context](#creating-a-context)
    -   [Context Provider](#context-provider)
    -   [Accessing the context](#accessing-the-context)
-   [MainContext](#maincontext) - overview of how context is used in the app

## Explicitly Pass Data to Components

Data which is is specific to one component or one small part of the component tree
can be passed in through component props:

```jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App() {
    return <Welcome name="Andrew" />;
}
```

Read [this documentation](https://reactjs.org/docs/components-and-props.html) for more.

## Context API

For "global" data that is used by practically every component in the React tree,
"context" is used to provide a way to share values without having to explcitly pass a prop
through every level in the tree.

There are three main parts of the Context API:

1. `React.createContext()` - create a new context
2. `React.Context.Provider` - parent component which provides nested components with the context
3. `useContext(React.Context)` - hook for accessing the context within nested components

More information is outlined below. Alternatively, read the [official docs](https://reactjs.org/docs/context.html).

### Creating a context

You can create a new context with

```js
const MyContext = React.createContext(defaultValue);
```

The `defaultValue` is only used when a component accesses the context without
a matching Provider above it in the tree. For this reason, I would recommend not
relying upon it.

### Context Provider

Context objects have a `Provider` property which allows nested components
to access the context.

The Provider component accepts a `value` which is essentially the state accessable

```jsx
function App() {
    const [theme, setState] = useState({
        value: { something: "something" },
    });
    return (
        <MyContext.Provider value={state}>
            <Layout />
        </MyContext.Provider>
    );
}
```

by the components. Note that there are [caveats to consider](https://reactjs.org/docs/context.html#caveats) when using the Provider.

### Accessing the Context

The `useContext(MyContext)` hook is used in copmonents to access the value of `MyContext`. When the context is updated, the hook will trigger a rerender of the
component.

```jsx
function Layout() {
    const myState = useContext(MyContext);
    return (
        // ...
    )
}
```

The entire app is wrapped in the `MainProvider`:

```jsx
function App() {
    return <MainProvider>// entire app tree</MainProvider>;
}
```

# MainContext

The Context, Provider, and a useful abstraction around `useContext` are found in [`MainContext.js`](../src/data/MainContext.js).

**Context**: The context of the app is `MainContext`.

**Provider**: The entire app is wrapped in `MainProvider`, which is the provider of `MainContext`:

```jsx
function App() {
    return <MainProvider>{/* component tree */}</MainProvider>;
}
```

**Access context**: the `useMainContext` hook is used to access the `MainContext`.
