import React, { useEffect, useState } from "react";
import {
    arrayUnique,
    selectActivitesBetweenDates,
    selectActivitiesOfType,
    selectActivitiesWithText,
    sortActivitiesByNewest,
} from "../data/activity-selectors";
import { useMainContext } from "../data/MainContext";

import SearchParams from "../model/SearchParams";

const useActivitySearch = (queryString) => {
    const [searchParams, setSearchParams] = useState(
        SearchParams.parseQueryString(queryString)
    );
    useEffect(
        () => setSearchParams(SearchParams.parseQueryString(queryString)),
        [queryString]
    ); // probably unnecessary
    console.dir(searchParams);

    // const searchParams = SearchParams.parseQueryString(queryString);
    // const {
    //     searchTerm,
    //     selectedType,
    //     fromDate,
    //     toDate /*, doSearchBetweenDates*/,
    // } = searchParams;

    const [{ activities }, dispatch] = useMainContext();

    const [searchResults, setSearchResults] = useState([]);
    const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);

    useEffect(() => {
        if (
            !searchParams.searchTerm &&
            !searchParams.selectedType &&
            !(searchParams.fromDate || searchParams.toDate)
        ) {
            setIsShowingSearchResults(false);
            setSearchResults([]); // If no filter, return none
        } else {
            setIsShowingSearchResults(true);
            setSearchResults(getFilteredResults());
        }
    }, [searchParams, activities]);

    const getFilteredResults = () => {
        let filteredActivities = [...activities];
        if (searchParams.searchTerm) {
            filteredActivities = selectActivitiesWithText(
                activities,
                searchParams.searchTerm
            );
        }

        if (searchParams.selectedType)
            filteredActivities = selectActivitiesOfType(
                filteredActivities,
                searchParams.selectedType
            );
        if (
            !!(
                searchParams.fromDate || searchParams.toDate
            ) /*doSearchBetweenDates*/
        ) {
            filteredActivities = selectActivitesBetweenDates(
                filteredActivities,
                searchParams.fromDate,
                searchParams.toDate
            );
        }
        const sortedActivities = sortActivitiesByNewest(filteredActivities);
        return sortedActivities;
    };

    return [searchResults, isShowingSearchResults];
};

export default useActivitySearch;
