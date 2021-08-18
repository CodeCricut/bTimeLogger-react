export const selectRunningActivities = (activities) =>
    activities.filter((act) => !act.endTime);

export const selectCompletedActivities = (activities) =>
    activities.filter((act) => act.endTime);

export const selectNonTrashedActivities = (activities) =>
    activities.filter((act) => !act.trashed);

export const selectTrashedActivities = (activities) =>
    activities.filter((act) => act.trashed);

export const selectActivitiesOfType = (activities, typeName) =>
    activities.filter((act) => act.type.name === typeName);

export const selectActivitiesWithCommentText = (activities, searchText) => {
    if (!searchText) return [];

    return activities.filter((act) => {
        if (!act.comment) return false;
        const searchContainsComment =
            searchText.toLowerCase().indexOf(act.comment.toLowerCase()) >= 0;
        const commentContainsSearch =
            act.comment.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        return searchContainsComment || commentContainsSearch;
    });
};

export const selectActivitiesWithTypeText = (activities, typeText) => {
    if (!typeText) return [];

    return activities.filter((act) => {
        if (!act.type.name) return false;
        return (
            typeText.toLowerCase().indexOf(act.type.name.toLowerCase()) >= 0 ||
            act.type.name.toLowerCase().indexOf(typeText.toLowerCase()) >= 0
        );
    });
};

export const selectActivitiesWithText = (activities, searchText) => {
    const withCommentText = selectActivitiesWithCommentText(
        activities,
        searchText
    );
    const withTypeText = selectActivitiesWithTypeText(activities, searchText);

    return arrayUnique(withCommentText.concat(withTypeText));
};

export const arrayUnique = (array) => {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) a.splice(j--, 1);
        }
    }

    return a;
};

export const selectActivitiesBeforeDate = (activities, endTime) =>
    activities.filter((act) => act.startTime < endTime);

export const selectActivitiesAfterDate = (activities, startTime) =>
    activities.filter((act) => act.endTime > startTime);

export const selectActivitesBetweenDates = (activities, startTime, endTime) => {
    const beforeDate = selectActivitiesBeforeDate(activities, endTime);
    const afterDate = selectActivitiesAfterDate(activities, startTime);
    return arrayUnique(beforeDate.concat(afterDate));
};

export const sortActivitiesByNewest = (activities) =>
    activities.sort((act1, act2) => act2.startTime - act1.startTime);

export const sortActivitiesByOldest = (activities) =>
    activities.sort((act1, act2) => act1.startTime - act2.startTime);
