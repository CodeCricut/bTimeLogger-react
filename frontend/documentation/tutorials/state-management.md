# React State Management

Quick links:

-   [Explicitly Pass Data to Components](#explicitly-pass-data-to-components)
-   [State Hook](#state-hook) - manage local component state
-   [Reducer Hook](#reducer-hook) - alternative to state hook when there is complex state logic
-   [Context API](#context-api) - quick overview of the React Context API
    -   [Creating a context](#creating-a-context)
    -   [Context Provider](#context-provider)
    -   [Accessing the context](#accessing-the-context)
-   [ThemeSwitcherContext](#themeswitchercontext) - overview of the theme context used in the app

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

## State Hook

```jsx
const [state, setState] = useState(initialState);
```

The `useState` Hook allows you to manage state within components. It is not sufficient to simply have local variables inside components because they will not persist across re-renders or trigger re-renders when updated.

```jsx
function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
```

Read more in the [docs](https://reactjs.org/docs/hooks-state.html).

## Reducer Hook

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

The `useReducer` Hook accepts a reducer function of type `(state, action) => newState` and returns the current state and a `dispatch` method.

**Reducer function** A reducer is used to update the state based on an action (and possibly a payload).

```js
function reducer(state, action) {
    if (action == "increment") return { count: state.count + 1 };
    else if (action == "decrement") return { count: state.count - 1 };
}
```

Note that the reducer should never modify the state parameter.

**Example**:

```jsx
function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
        </>
    );
}
```

Read more in the [docs](https://reactjs.org/docs/hooks-reference.html).

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
by the components. Note that there are [caveats to consider](https://reactjs.org/docs/context.html#caveats) when using the Provider.

```jsx
function App() {
    const [state, setState] = useState({
        value: { something: "something" },
    });
    return (
        <MyContext.Provider value={state}>
            <Layout />
        </MyContext.Provider>
    );
}
```

### Accessing the Context

The `useContext(MyContext)` hook is used in components to access the value of `MyContext`. When the context is updated, the hook will trigger a rerender of the
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
    return <MainProvider>{/* entire app tree */}</MainProvider>;
}
```

# ThemeSwitcherContext

In this app, a context is used to share theme state and a way to change the theme
from within components. Details can be found in {@tutorial theme-switcher}.

# ActivityContext

In this app, a context is used to share activity state. Details can be found in {@tutorial activity-state}.

# ActivityTypeContext

In this app, a context is used to share activity type state. Details can be found in {@tutorial activity-type-state}.
