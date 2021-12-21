import React, { useState } from "react";
import { Select, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const styles = {
    menuSelect: {
        ".MuiSelect-icon": {
            color: "text.secondary",
            backgroundColor: "transparent",
        },
        ".MuiInput-input:focus": {
            backgroundColor: "transparent",
        },
    },
};

const MenuDropdown = ({ tooltipText, children }) => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const openDrowdown = () => {
        setIsDropdownOpen(true);
        setIsTooltipOpen(false);
    };

    return (
        <Tooltip title={tooltipText ?? ""} open={isTooltipOpen}>
            <Select
                onMouseEnter={() => setIsTooltipOpen(true)}
                onMouseLeave={() => setIsTooltipOpen(false)}
                open={isDropdownOpen}
                onOpen={openDrowdown}
                onClose={() => setIsDropdownOpen(false)}
                IconComponent={MoreVertIcon}
                sx={styles.menuSelect}
                variant="standard"
                disableUnderline
            >
                {children}
            </Select>
        </Tooltip>
    );
};

export default MenuDropdown;
