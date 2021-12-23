import { ActivityModel } from "../activities/ActivityModel";
import SearchParams from "../model/SearchParams";

/**
 * Get the filtered list of activities based on the search parameters.
 * @param {Array[ActivityModel]} activities
 * @param {SearchParams} searchParams
 */
function getSearchedActivities(activities, searchParams) {
    let filteredActivities = [...activities];

    if (searchParams.searchTerm) {
        filteredActivities = selectActivitiesWithText(
            activities,
            searchParams.searchTerm
        );
    }

    if (searchParams.selectedType) {
        filteredActivities = selectActivitiesOfType(
            filteredActivities,
            searchParams.selectedType
        );
    }

    if (!!(searchParams.fromDate || searchParams.toDate)) {
        filteredActivities = selectActivitesBetweenDates(
            filteredActivities,
            searchParams.fromDate,
            searchParams.toDate
        );
    }

    return sortActivitiesByNewest(filteredActivities);
}

function selectRunningActivities(activities) {
    return activities.filter((act) => !act.endTime);
}

function selectCompletedActivities(activities) {
    return activities.filter((act) => act.endTime);
}

function selectNonTrashedActivities(activities) {
    return activities.filter((act) => !act.trashed);
}

function selectTrashedActivities(activities) {
    return activities.filter((act) => act.trashed);
}

function selectActivitiesOfType(activities, typeName) {
    return activities.filter((act) => act.type.name === typeName);
}

function selectActivitiesWithCommentText(activities, searchText) {
    if (!searchText) return [];

    return activities.filter((act) => {
        if (!act.comment) return false;
        const searchContainsComment =
            searchText.toLowerCase().indexOf(act.comment.toLowerCase()) >= 0;
        const commentContainsSearch =
            act.comment.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        return searchContainsComment || commentContainsSearch;
    });
}

function selectActivitiesWithTypeText(activities, typeText) {
    if (!typeText) return [];

    return activities.filter((act) => {
        if (!act.type.name) return false;
        return (
            typeText.toLowerCase().indexOf(act.type.name.toLowerCase()) >= 0 ||
            act.type.name.toLowerCase().indexOf(typeText.toLowerCase()) >= 0
        );
    });
}

function selectActivitiesWithText(activities, searchText) {
    const withCommentText = selectActivitiesWithCommentText(
        activities,
        searchText
    );
    const withTypeText = selectActivitiesWithTypeText(activities, searchText);

    return arrayUnique(withCommentText.concat(withTypeText));
}

function arrayUnique(array) {
    const a = [...array];
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) a.splice(j--, 1);
        }
    }

    return a;
}

function arrayJoinShared(array1, array2) {
    const arrayA = [...array1];
    const arrayB = [...array2];

    const joined = [];
    for (let i = 0; i < arrayA.length; i++) {
        const item = arrayA[i];
        if (
            joined.indexOf(item) === -1 && // not in joined
            arrayB.indexOf(item) !== -1 // in other arr
        )
            joined.push(item);
    }
    for (let i = 0; i < arrayB.length; i++) {
        const item = arrayB[i];
        if (
            joined.indexOf(item) === -1 && // not in joined
            arrayA.indexOf(item) !== -1 // in other arr
        )
            joined.push(item);
    }

    return joined;
}

function pushUniqueElementsIntoArr(sourceArr, recieverArr) {
    for (let i = 0; i < sourceArr.length; i++) {
        if (recieverArr.findIndex((item) => item === sourceArr[i]) === -1)
            recieverArr.push(sourceArr[i]);
    }
}

function selectActivitiesBeforeDate(activities, endTime) {
    if (!endTime) return [...activities];
    return activities.filter((act) =>
        act.startTime ? act.startTime < endTime : true
    );
}

function selectActivitiesAfterDate(activities, startTime) {
    if (!startTime) return [...activities];
    return activities.filter((act) =>
        act.endTime ? act.endTime > startTime : true
    );
}

function selectActivitesBetweenDates(activities, startTime, endTime) {
    const beforeDate = selectActivitiesBeforeDate(activities, endTime);
    const afterDate = selectActivitiesAfterDate(activities, startTime);
    return arrayJoinShared(beforeDate, afterDate);
}

function sortActivitiesByNewest(activities) {
    return activities.sort((act1, act2) => act2.startTime - act1.startTime);
}

function sortActivitiesByOldest(activities) {
    return activities.sort((act1, act2) => act1.startTime - act2.startTime);
}

export { getSearchedActivities };
