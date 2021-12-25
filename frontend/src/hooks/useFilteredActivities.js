import { useEffect, useMemo, useState } from "react";
import { ActivityModel } from "../activities/ActivityModel.js";
import SearchParams from "../model/SearchParams.js";
import { getSearchedActivities } from "../util/activity-selectors.js";

/**
 * @param {Array<ActivityModel>} activities The activities to filter from
 * @param {SearchParams} searchParams The search parameters to use to filter the activities
 * @returns {Array<ActivityModel>} The filtered activities
 */
const useFilteredActivities = (activities, searchParams) => {
    const filtered = useMemo(
        () => getSearchedActivities(activities, searchParams),
        [activities, searchParams]
    );
    return filtered;
};

export default useFilteredActivities;
