import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState, useEffect } from "react";
import { useTypeRepository } from "../activity-types/useTypeRepository";

const ActivityTypeSelect = ({ selectedType, setSelectedType, onEnter }) => {
    const [typeState, dis] = useTypeRepository();

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
