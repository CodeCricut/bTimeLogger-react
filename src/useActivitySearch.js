import React, { useEffect, useState } from "react";
import {
    arrayUnique,
    selectActivitesBetweenDates,
    selectActivitiesOfType,
    selectActivitiesWithText,
    sortActivitiesByNewest,
} from "./data/activity-selectors";
import { useMainContext } from "./data/MainContext";

const useActivitySearch = ({ searchParams }) => {
    const { searchTerm, selectedType, doSearchBetweenDates, fromDate, toDate } =
        searchParams;

    const [{ activities }, dispatch] = useMainContext();

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (!searchTerm && !selectedType && !doSearchBetweenDates) {
            setSearchResults([]); // If no filter, return none
            console.log("no results");
            return;
        }
        let filteredActivities = [...activities];
        if (searchTerm) {
            filteredActivities = selectActivitiesWithText(
                activities,
                searchTerm
            );
        }

        if (selectedType)
            filteredActivities = selectActivitiesOfType(
                filteredActivities,
                selectedType
            );
        if (doSearchBetweenDates) {
            filteredActivities = selectActivitesBetweenDates(
                filteredActivities,
                fromDate,
                toDate
            );
        }
        const sortedActivities = sortActivitiesByNewest(filteredActivities);
        setSearchResults(sortedActivities);
    }, [
        searchTerm,
        selectedType,
        doSearchBetweenDates,
        fromDate,
        toDate,
        activities,
    ]);

    return searchResults;
};

export default useActivitySearch;
