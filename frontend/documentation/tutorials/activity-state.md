# Activity State

A global context is used for managing the activity state of the application.

**Activity Provider**: The `ActivityProvider` should wrap the entire component tree to provide a global context for the activity state.

```jsx
function App() {
    return <ActivityProvider>{/* component tree */}</ActivityProvider>;
}
```

**Use activity context hook**:

```jsx
const [state, dispatch] = useActivityContext();
```
