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

export const selectActivitiesWithCommentText = (activities, commentText) =>
    activities.filter(
        (act) =>
            commentText.toLowerCase().indexOf(act.comment.toLowerCase()) >= 0 ||
            act.comment.toLowerCase().indexOf(commentText.toLowerCase()) >= 0
    );

export const selectActivitiesWithTypeText = (activities, typeText) =>
    activities.filter(
        (act) =>
            typeText.toLowerCase().indexOf(act.type.name.toLowerCase()) >= 0 ||
            act.type.name.toLowerCase().indexOf(typeText.toLowerCase()) >= 0
    );

export const selectActivitiesWithText = (activities, searchText) => {
    const withCommentText = selectActivitiesWithCommentText(
        activities,
        searchText
    );
    return selectActivitiesWithTypeText(withCommentText, searchText);
};

export const sortActivitiesByNewest = (activities) =>
    activities.sort((act1, act2) => act2.startTime - act1.startTime);

export const sortActivitiesByOldest = (activities) =>
    activities.sort((act1, act2) => act1.startTime - act2.startTime);
