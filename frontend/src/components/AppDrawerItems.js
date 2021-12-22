import React from "react";
import { ListItem, ListItemText } from "@mui/material";
const AppDrawerItems = () => {
    return (
        <React.Fragment>
            {["Intervals", "Statistics", "Trash"].map((text, index) => (
                <ListItem button key={index}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </React.Fragment>
    );
};

export default AppDrawerItems;
