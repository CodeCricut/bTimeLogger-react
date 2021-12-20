import React, { useEffect, useState } from "react";
import {
    FormControl,
    IconButton,
    Box,
    Paper,
    Tooltip,
} from "@material-ui/core";
import {
    Add as AddIcon,
    ContactsOutlined,
    Tune as TuneIcon,
} from "@material-ui/icons";

import StartActivityDialog from "./StartActivityDialog";
import useInlineStartActivityStyles from "../style/useInlineStartActivityStyles";

import ActivityTypeSelect from "./ActivityTypeSelect";
import { useActivityRepository } from "../activities/useActivityRepository";
import { useTypeRepository } from "../activity-types/useTypeRepository";

const InlineStartActivity = () => {
    const classes = useInlineStartActivityStyles();

    const [types, { addType }] = useTypeRepository();
    const [activities, { startNew }] = useActivityRepository();

    const [selectedType, setSelectedType] = useState("");
    const [invalidType, setInvalidType] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (!selectedType) setInvalidType(true);
        else setInvalidType(false);
    }, [selectedType]);

    const startActivity = async () => {
        if (invalidType) return;

        // TODO: should use type repository
        const type = await addType({
            name: selectedType,
        });
        console.log("added type");
        console.dir(type);

        const activity = await startNew({
            type: type._id,
        });
        console.log("started new activity");
        console.dir(activity);

        setSelectedType("");
    };

    const tuneActivity = () => {
        setIsDialogOpen(true);
    };

    return (
        <React.Fragment>
            <StartActivityDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <Paper variant="outlined" className={classes.outline}>
                <FormControl className={classes.formControl}>
                    <Box className={classes.select}>
                        <ActivityTypeSelect
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                            onEnter={() => startActivity()}
                        />
                    </Box>

                    <Box className={classes.formButtons}>
                        <Tooltip title="Start Activity">
                            <span>
                                <IconButton
                                    disabled={invalidType}
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="start activity"
                                    onClick={startActivity}
                                >
                                    <AddIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Adjust Activity">
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="tune activity"
                                onClick={tuneActivity}
                            >
                                <TuneIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </FormControl>
            </Paper>
        </React.Fragment>
    );
};

export default InlineStartActivity;
