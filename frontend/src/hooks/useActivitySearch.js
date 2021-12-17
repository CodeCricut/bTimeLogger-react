import { useEffect, useState } from "react";
import {
    selectActivitesBetweenDates,
    selectActivitiesOfType,
    selectActivitiesWithText,
    sortActivitiesByNewest,
} from "../util/activity-selectors";

import SearchParams from "../model/SearchParams";

const useActivitySearch = (queryString) => {
    const [searchParams, setSearchParams] = useState(
        SearchParams.parseQueryString(queryString)
    );
    // TODO: this seems to be unnecessary. I left this comment a while ago and am not sure what that means exactly.
    // I think I meant the queryString dependency is unnecessary
    useEffect(
        () => setSearchParams(SearchParams.parseQueryString(queryString)),
        [queryString]
    );

    // TODO: get activities from useActivityRepository
    const activities = [];

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
        if (!!(searchParams.fromDate || searchParams.toDate)) {
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
