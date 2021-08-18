import React, { useEffect, useState } from "react";
import {
    arrayUnique,
    selectActivitesBetweenDates,
    selectActivitiesOfType,
    selectActivitiesWithText,
    sortActivitiesByNewest,
} from "../data/activity-selectors";
import { useMainContext } from "../data/MainContext";

const useActivitySearch = ({ searchParams }) => {
    const { searchTerm, selectedType, doSearchBetweenDates, fromDate, toDate } =
        searchParams;

    const [{ activities }, dispatch] = useMainContext();

    const [searchResults, setSearchResults] = useState([]);
    const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);

    useEffect(() => {
        if (!searchTerm && !selectedType && !doSearchBetweenDates) {
            setIsShowingSearchResults(false);
            setSearchResults([]); // If no filter, return none
        } else {
            setIsShowingSearchResults(true);
            setSearchResults(getFilteredResults());
        }
    }, [
        searchTerm,
        selectedType,
        doSearchBetweenDates,
        fromDate,
        toDate,
        activities,
    ]);

    const getFilteredResults = () => {
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
        return sortedActivities;
    };

    return [searchResults, isShowingSearchResults];
};

export default useActivitySearch;
