import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeSwitcherProvider } from "../style/ThemeSwitcherContext";
import { ListItem, ListItemText } from "@mui/material";

import Layout from "./Layout";
import ActivityList from "./ActivityList.js";
import Activity from "./Activity.js";
import CompletedActivityMenu from "./CompletedActivityMenu";
import Duration from "./Duration.js";
import useDate from "../hooks/useDate.js";

import { useActivityRepository } from "../activities/useActivityRepository.js";
import { useTypeRepository } from "../activity-types/useTypeRepository.js";
import StartedActivityMenu from "./StartedActivityMenu.js";
import SearchAppBar from "./SearchAppBar";
import AppBarHeader from "./AppBarHeader";
import AppBarSearchBox from "./AppBarSearchBox";
import SettingsButton from "./SettingsButton";
import AppDrawer from "./AppDrawer";
import InlineStartActivity from "./InlineStartActivity";
import ActivityTypeSelect from "./ActivityTypeSelect";

function App() {
    const [activityState, {}] = useActivityRepository();
    const [typeState, {}] = useTypeRepository();
    const currentDate = useDate();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [selectedType, setSelectedType] = useState("initial type");

    const handleEdit = () => {
        console.log("handle edit");
    };

    const handleResume = () => {
        console.log("handle resume");
    };

    const handleTrash = () => {
        console.log("handle trash");
    };

    const handleStop = () => {
        console.log("handle stop");
    };

    return (
        <ThemeSwitcherProvider>
            <CssBaseline />
            <AppDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                {["Intervals", "Statistics", "Trash"].map((text, index) => (
                    <ListItem button key={index}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </AppDrawer>
            <Layout
                renderAppBar={() => (
                    <SearchAppBar
                        renderHeader={() => (
                            <AppBarHeader
                                title={"bTimeLogger"}
                                handleOpenDrawer={() => setIsDrawerOpen(true)}
                            />
                        )}
                        renderSearchbox={() => (
                            <AppBarSearchBox
                                handleSearch={(term) => console.log(term)}
                                handleTune={() => console.log("tune")}
                                originalTerm="original"
                            />
                        )}
                        renderRightSide={() => (
                            <SettingsButton
                                onClick={() => console.log("open settings")}
                            />
                        )}
                    />
                )}
                renderStartActivity={() => (
                    <InlineStartActivity
                        startActivity={() => console.log("start activity")}
                        tuneActivity={() => console.log("tune activity")}
                        renderTypeSelect={() => (
                            <ActivityTypeSelect
                                onEnter={() => console.log("type selected")}
                                types={typeState.types}
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                            />
                        )}
                    />
                )}
                renderActivityList={() => (
                    <ActivityList
                        activities={activityState.activities}
                        renderCompletedActivity={(activity) => (
                            <Activity
                                activity={activity}
                                renderMenu={() => (
                                    <CompletedActivityMenu
                                        handleEdit={() => handleEdit(activity)}
                                        handleResume={() =>
                                            handleResume(activity)
                                        }
                                        handleTrash={() =>
                                            handleTrash(activity)
                                        }
                                    />
                                )}
                                renderDuration={() => (
                                    <Duration
                                        startDate={activity.startTimeDate}
                                        endDate={activity.endTimeDate}
                                    />
                                )}
                            />
                        )}
                        renderStartedActivity={(activity) => (
                            <Activity
                                activity={activity}
                                renderMenu={() => (
                                    <StartedActivityMenu
                                        handleStop={handleStop}
                                    />
                                )}
                                renderDuration={() => (
                                    <Duration
                                        startDate={activity.startTimeDate}
                                        endDate={currentDate}
                                    />
                                )}
                            />
                        )}
                    />
                )}
            />
        </ThemeSwitcherProvider>
    );
}

export default App;
