import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

import activityTypes from "./data/activity-types";

const ActivityTypeSelect = ({
    selectedValue,
    setSelectedValue,
    inputValue,
    setInputValue,
}) => {
    return (
        <Autocomplete
            freeSolo
            options={activityTypes}
            fullWidth
            getOptionLabel={(opt) => opt}
            value={selectedValue}
            onChange={(event, newValue) => setSelectedValue(newValue)}
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
