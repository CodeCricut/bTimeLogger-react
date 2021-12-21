import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { jest, expect, describe, it } from "@jest/globals";
import { MenuItem } from "@mui/material";
import MenuDropdown from "./MenuDropdown.js";

test("shows provided tooltip on hover", () => {
    const tooltip = "PROVIDED TOOLTIP";
    render(
        <MenuDropdown tooltipText={tooltip}>
            <MenuItem />
        </MenuDropdown>
    );
    fireEvent.mouseOver(screen.getByRole("button"));

    screen.getByText(tooltip);
});

test("shows default tooltip 'Options'", () => {
    const expectedTooltip = "Options";
    render(
        <MenuDropdown>
            <MenuItem />
        </MenuDropdown>
    );
    fireEvent.mouseOver(screen.getByRole("button"));

    screen.getByText(expectedTooltip);
});
