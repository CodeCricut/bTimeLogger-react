import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Allows us to mock the behavior of axios (used for API calls)
const axiosMock = new MockAdapter(axios);

function onGetAllActivites() {
    return axiosMock.onGet("/activities");
}

function onGetActivity(id) {
    return axiosMock.onGet(`/activities/${id}`);
}

function onStartNewActivity() {
    return axiosMock.onPost(`/activities/start-new`);
}

function onCreateCompletedActivity() {
    return axiosMock.onPost(`/activities/create-completed`);
}

function onStopActivity(id) {
    return axiosMock.onPatch(`/activities/stop/${id}`);
}

function onResumeActivity(id) {
    return axiosMock.onPatch(`/activities/resume/${id}`);
}

function onTrashActivity(id) {
    return axiosMock.onPatch(`/activities/trash/${id}`);
}

function onUntrashActivity(id) {
    return axiosMock.onPatch(`/activities/untrash/${id}`);
}

function onUpdateActivity(id) {
    return axiosMock.onPut(`/activities/update/${id}`);
}

function onRemoveActivity(id) {
    return axiosMock.onDelete(`/activities/remove/${id}`);
}

export {
    onGetAllActivites,
    onGetActivity,
    onStartNewActivity,
    onCreateCompletedActivity,
    onStopActivity,
    onResumeActivity,
    onTrashActivity,
    onUntrashActivity,
    onUpdateActivity,
    onRemoveActivity,
};
