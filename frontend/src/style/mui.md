# Material UI

Theming and styling is done with [MUI](https://mui.com/) (formerly Material UI).

## Getting Started

### MUI Components

MUI comes with tons of isolated components such as `Button`. Using a component is as simple as this:

```jsx
import Button from "@mui/material/Button";

function App() {
    return <Button variant="contained">Hello world</Button>;
}
```

### CssBaseline

The optional `CssBaseline` component provides a baseline style for common HTML elements. It is found in the `App` component.

## Typography

**Font**: The Roboto font is installed through the `@fontsource/roboto` package, and applied globally by importing in in `App`:

```jsx
import "@fontsource/roboto";
```

**Typography component**: The `Typography` component makes it easy to apply a default set of font weights and sized in the app:

```jsx
<Typography variant="h1">Heading</Typography>
```

Additional info can be found in the [docs](https://mui.com/components/typography/).

## Styles

More information on styles/customization can be found in the [docs](https://mui.com/customization/how-to-customize/).

In MUI V5, styling is primarily done with two APIs:

1. the `sx` API
2. `styled` API

### SX Prop

According to the [docs](https://mui.com/system/the-sx-prop/), "the `sx` prop is a shortcut for defining custom style that has access to the theme."

**Example**:

```jsx
import * as React from "react";
import { Box, ThemeProvider, createTheme } from "@mui/system";

const theme = createTheme({
    palette: {
        background: {
            paper: "#fff",
        },
        text: {
            primary: "#173A5E",
            secondary: "#46505A",
        },
        action: {
            active: "#001E3C",
        },
        success: {
            dark: "#009688",
        },
    },
});

export default function Example() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: "background.paper", // Access a value in theme.palette; bgcolor is an alias for backgroundColor
                    boxShadow: 1, // maps to theme.shadows
                    borderRadius: 2, // is multiplied by theme.shape.borderRadius value (default is 4px)
                    p: 2,
                    minWidth: 300, // if not in [0, 1], then set directly as css value (300px)
                }}
            >
                <Box sx={{ color: "text.secondary" }}>Sessions</Box>
                <Box
                    sx={{
                        color: "text.primary",
                        fontSize: 34,
                        fontWeight: "medium",
                    }}
                >
                    98.3 K
                </Box>
                <Box
                    sx={{
                        color: "success.dark", // theme.palette.success.dark
                        display: "inline",
                        fontWeight: "bold", // theme.typography.fontWeightLight
                        mx: 0.5,
                        fontSize: 14,
                        margin: 2, // multiplied by theme.spacing (8px by default)
                    }}
                >
                    +18.77%
                </Box>
                <Box
                    sx={{
                        color: "text.secondary",
                        display: "inline",
                        fontSize: 14,
                    }}
                >
                    vs. last week
                </Box>
            </Box>
        </ThemeProvider>
    );
}
```

**Sharing styles**:

If you would like to share a style between components or just extrac the style, you can just
use a plain old object containing the styles:

```jsx
const style = {
    mt: 2,
    ml: 2,
    width: { sm: 200, md: 300 },
    backgroundColor: { xs: "secondary.light", sm: "#0000ff" },
    boxShadow: 6
};

const MyComponent = () => {
    return (
        <TextField
            sx={{
                ...style, // copy styles
                color: "text.secondary" // override as necessary
            }}>
    )
}
```

**Breakpoints**:

You can style components based on breakpoints super easily:

```jsx
backgroundColor: { xs: "secondary.light", sm: "#0000ff" }
```

**Accessing the theme**:

As you have already seen, you can access theme values from within the style value:

```jsx
const style = {
    borderColor: "primary.main", // theme.palette.primary.main
    color: "secondary.main", // theme.palette.secondary.main
    borderRadius: 2, // theme.shape.borderRadius
    gap: 2, // multiplied by theme.spacing (default is 8px)
    boxShadow: 1, // maps to theme.shadows value
    width: 1 / 2, // when < 1, will be percent (50% in this case)
    height: 100, // when > 1, will map directly (100px)
    margin: 2, // multiplied by theme.spacing (default is 8px)
    fontWeight: "light", // theme.typography.light
};
```

**Callback values**:

Each property can receive a callback which accepts a `theme` argument:

```jsx
backgroundColor: { xs: "secondary.light", sm: "#0000ff" }
```

The `sx` property itself also accepts a function callback:

```jsx
<Box
    sx={(theme) => ({
        ...theme.typography.body,
        color: theme.palette.primary.main,
    })}
/>
```

## Theming

Details about theming with MUI can be found in the [documentation](https://mui.com/customization/theming/).

**Theme Provider**: In order to provide custom theming, we need to use a `ThemeProvider` component. The
component accepts a `theme` argument which is an object returned by `createTheme({...})`

The theme objects can be found in [`theme.js`](./theme.js)

```
const darkTheme = createTheme({
    palette: {
       ...
    },
});
```

From there, pass the the object into a `ThemeProvider` which wraps the entire component tree (or at least the components you want to style):

```jsx
<ThemeProvider theme={darkTheme}>{/* component tree */}</ThemeProvider>
```

**Accessing the theme in a component**:
If you need to access the theme inside a component, the `useTheme` hook is available:

```jsx
function MyComponent() {
    const theme = useTheme();
    return <span>{`spacing ${theme.spacing}`}</span>;
}
```

### Theme Switcher

Our app uses a custom theme context which allows components to change the global theme. Read more in [`theme-switcher.md`](./theme-switcher.md)
