# Activity Type State

A global context is used for managing the activity type state of the application.

**Activity Type Provider**: The `ActivityTypeProvider` should wrap the entire component tree to provide a global context the activity type state.

```jsx
function App() {
    return <ActivityTypeProvider>{/* component tree */}</ActivityTypeProvider>;
}
```

**Use activity type context hook**:

```jsx
const [state, dispatch] = useActivityTypeContext();
```
