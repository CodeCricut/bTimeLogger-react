import React, { useState } from "react";
import { Select, MenuItem, Box, Typography, Tooltip } from "@material-ui/core";
import {
    MoreVert as VerticalDotsIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    PlayArrow as PlayArrowIcon,
} from "@material-ui/icons";
import Moment from "react-moment";

import EditActivityDialog from "./EditActivityDialog";
import useCompletedActivityStyles from "./hooks/useCompletedActivityStyles";
import { formatDuration } from "./util/timeFormatters";
import { useMainContext } from "./data/MainContext";
import { RESUME_ACTIVITY, TRASH_ACTIVITY } from "./data/activity-reducer";
import { useThemeSwitcherContext } from "./data/ThemeSwitcherContext";
import useActivityRepository from "./activities/useActivityRepository";

const CompletedActivity = ({ activity }) => {
    console.dir(activity);
    const [theme, setTheme] = useThemeSwitcherContext();
    const classes = useCompletedActivityStyles({ theme });

    const [
        activityState,
        {
            startActivity,
            createCompletedActivity,
            stopActivity,
            resumeActivity,
            trashActivity,
            untrashActivity,
            updateActivity,
            removeActivity,
        },
    ] = useActivityRepository([]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownOpen = () => {
        setIsDropdownOpen(true);
        setIsTooltipOpen(false);
    };
    const handleDropdownClose = () => setIsDropdownOpen(false);

    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const handleEditOpen = () => setIsEditOpen(true);
    const handleEditClose = () => setIsEditOpen(false);

    const handleResume = () => resumeActivity(activity._id);

    const handleTrash = () => trashActivity(activity._id);

    const moreDropdownMenu = () => (
        <Tooltip title="Options" open={isTooltipOpen}>
            <Select
                onMouseEnter={() => setIsTooltipOpen(true)}
                onMouseLeave={() => setIsTooltipOpen(false)}
                inputProps={{
                    classes: {
                        root: classes.moreSelectRoot,
                        icon: classes.moreSelectIcon,
                    },
                }}
                open={isDropdownOpen}
                onOpen={handleDropdownOpen}
                onClose={handleDropdownClose}
                disableUnderline
                IconComponent={VerticalDotsIcon}
            >
                <MenuItem className={classes.menuItem} onClick={handleEditOpen}>
                    <EditIcon className={classes.dropdownIcon} />
                    Edit
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleResume}>
                    <PlayArrowIcon className={classes.dropdownIcon} />
                    Resume
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleTrash}>
                    <DeleteIcon className={classes.dropdownIcon} />
                    Trash
                </MenuItem>
            </Select>
        </Tooltip>
    );
    return (
        <React.Fragment>
            <EditActivityDialog
                isOpen={isEditOpen}
                onClose={handleEditClose}
                activity={activity}
            />
            <Box className={classes.activityBox}>
                <Box className={classes.activityName}>
                    <Typography variant="h6" className={classes.activityName}>
                        {activity.type.name}
                    </Typography>
                    {activity.trashed ? (
                        <Typography
                            variant="subtitle1"
                            className={`${classes.subtitle}`}
                        >
                            (trashed)
                        </Typography>
                    ) : (
                        ""
                    )}
                </Box>
                <Box className={classes.dropdownContainer}>
                    {moreDropdownMenu()}
                </Box>
                <Typography
                    variant="subtitle1"
                    className={`${classes.time} ${classes.subtitle}`}
                >
                    <Moment>{activity.startTime}</Moment> -{" "}
                    <Moment>{activity.endTime}</Moment>
                </Typography>
                <Typography
                    variant="subtitle1"
                    className={`${classes.duration} ${classes.subtitle}`}
                >
                    {formatDuration(activity.startTime, activity.endTime)}
                    {/* {activity.duration} */}
                </Typography>
            </Box>
        </React.Fragment>
    );
};

export default CompletedActivity;
