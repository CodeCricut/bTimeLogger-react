# Theme Switcher

Our app uses a custom [`ThemeSwitcherContext`](./ThemeSwitcherContext.js) and `ThemeSwitcherProvider` which wraps MUI's `ThemeProvider`. The purpose of the custom
theme provider is to allow apps to switch the theme on a whim and have that update
propogate to all other components.

**Themes**: The actual themes themselves are found in [`theme.js`](./theme.js).

**Theme Switcher Provider**: The `ThemeSwitcherProvider` should wrap the entire component tree to provide a global context for the theme switcher.

```jsx
function App() {
    return (
        <ThemeSwitcherProvider>{/* component tree */}</ThemeSwitcherProvider>
    );
}
```

**Use theme switcher hook**:

```jsx
const setTheme = useThemeSwitcherContext();
```

The `useThemeSwitcherProvider` hook should be used when a component needs to change
the theme, OR when a component needs to explicitly access the theme object (this is usually not necessary, as it is provided by the `ThemeProvider`.

**Change theme**:

```jsx
import { useTheme } from "@mui/styles";
import { useThemeSwitcherContext } from "../style/ThemeSwitcherContext";
import { DARK, LIGHT } from "../style/theme";

const MyComponent = () => {
    const theme = useTheme();
    const setTheme = useThemeSwitcherContext();

    const handleThemeChange = () => {
        if (theme === DARK) setTheme(LIGHT);
        else setTheme(DARK);
    };

    // ...
};
```
