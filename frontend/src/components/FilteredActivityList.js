import React from "react";

import { useActivityRepository } from "../activities/useActivityRepository.js";
import ActivityList from "./ActivityList.js";
import useSearchParams from "../hooks/useSearchParams.js";
import useFilteredActivities from "../hooks/useFilteredActivities.js";

/**
 * @param {object} props
 * @param {string} props.queryString The query string to use for filtering activities.
 */
const FilteredActivityList = ({ queryString }) => {
    const [activityState, {}] = useActivityRepository();
    const searchParams = useSearchParams(queryString);
    const filteredActivities = useFilteredActivities(
        activityState.activities,
        searchParams
    );

    return <ActivityList activities={filteredActivities} />;
};

export default FilteredActivityList;
