import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const ActivityTypeSelect = ({
    types,
    selectedType,
    setSelectedType,
    onEnter,
}) => {
    const [value, setValue] = useState(selectedType);
    const [inputValue, setInputValue] = useState(selectedType);

    useEffect(() => {
        if (inputValue) {
            setSelectedType(inputValue);
        } else {
            setSelectedType("");
        }
    }, [value, inputValue]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") onEnter();
    };

    return (
        <Autocomplete
            freeSolo
            options={types.map((type) => type.name)}
            fullWidth
            value={value}
            onChange={(event, newVal) => setValue(newVal)}
            inputValue={inputValue}
            onInputChange={(event, newValue) => setInputValue(newValue)}
            renderInput={(params) => (
                <TextField
                    size="small"
                    {...params}
                    variant="standard"
                    label="Activity Type"
                    onKeyDown={handleKeyDown}
                />
            )}
        />
    );
};

export default ActivityTypeSelect;
