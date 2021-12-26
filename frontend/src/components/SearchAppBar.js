import React from "react";
import {
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    AppBar,
    Box,
} from "@mui/material";

import AppBarHeader from "./AppBarHeader";
import AppBarSearchBox from "./AppBarSearchBox";
import SettingsButton from "./SettingsButton";
import InlineStartActivity from "./InlineStartActivity";
import ActivityTypeSelect from "./ActivityTypeSelect";
import { useModalContext } from "../modals/ModalProvider";
import TuneSearchDialog from "./TuneSearchDialog";
import SettingsDialog from "./SettingsDialog";

const styles = {
    toolbar: {
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr 11fr auto",
            sm: "1fr 2fr 1fr auto",
        },
    },
    toolbarHeader: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    searchContainer: {
        display: "flex",
    },
    rightSideContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        marginLeft: {
            xs: 2,
        },
    },
};

/**
 *
 * @param {object} props
 * @param {function} props.openDrawer Callback when the app drawer should be opened.
 * @param {string} props.queryString The query string in the search box.
 * @param {function} props.setQueryString Callback when the user searches for something.
 * @param {function} props.onOpenTuneDialog Callback whent the user chooses to open the tune search dialog.
 */
const SearchAppBar = ({ openDrawer, queryString, setQueryString }) => {
    const [setModal, unsetModal] = useModalContext();

    return (
        <AppBar position="static">
            <Toolbar sx={styles.toolbar}>
                <Box sx={styles.toolbarHeader}>
                    <AppBarHeader
                        title={"bTimeLogger"}
                        handleOpenDrawer={openDrawer}
                    />
                </Box>
                <Box sx={styles.searchContainer}>
                    <AppBarSearchBox
                        handleSearch={(term) => setQueryString(term)}
                        handleTune={() =>
                            setModal(
                                <TuneSearchDialog
                                    queryString={queryString}
                                    setQueryString={setQueryString}
                                />
                            )
                        }
                        originalTerm={queryString}
                    />
                </Box>
                <Box sx={styles.rightSideContainer}>
                    <SettingsButton
                        onClick={() => setModal(<SettingsDialog />)}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SearchAppBar;
