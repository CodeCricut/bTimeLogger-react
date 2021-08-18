import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState, useEffect } from "react";
import { useMainContext } from "./data/MainContext";

const ActivityTypeSelect = ({ selectedType, setSelectedType, onEnter }) => {
    const [{ activities, types }, dispatch] = useMainContext();

    const [value, setValue] = useState(selectedType);
    const [inputValue, setInputValue] = useState(selectedType);

    useEffect(() => {
        if (inputValue) {
            setSelectedType(inputValue);
        } else {
            setSelectedType("");
        }
    }, [value, inputValue]);
    return (
        // TODO: reset on enter
        <Autocomplete
            freeSolo
            options={types.map((type) => type.name)}
            fullWidth
            getOptionLabel={(opt) => opt}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            inputValue={inputValue}
            onInputChange={(event, newValue) => setInputValue(newValue)}
            renderInput={(params) => (
                <TextField
                    size="small"
                    {...params}
                    variant="standard"
                    label="Activity Type"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onEnter();
                        }
                    }}
                />
            )}
        />
    );
};

export default ActivityTypeSelect;
