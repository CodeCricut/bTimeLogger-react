import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState, useEffect } from "react";
import { useMainContext } from "./data/MainContext";

const ActivityTypeSelect = ({ selectedType, setSelectedType }) => {
    const [{ activities, types }, dispatch] = useMainContext();

    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState(selectedType);

    useEffect(() => {
        if (inputValue) {
            setSelectedType(inputValue);
        } else if (value) {
            setSelectedType(value);
        }
    }, [value, inputValue]);
    return (
        <Autocomplete
            freeSolo
            options={types}
            fullWidth
            getOptionLabel={(opt) => {
                if (opt) return opt.name;
                return "";
            }}
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
                />
            )}
        />
    );
};

export default ActivityTypeSelect;
