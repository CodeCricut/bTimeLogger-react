import {
    startActivity,
    createCompletedActivity,
    stopActivity,
    resumeActivity,
    trashActivity,
} from "./activity-reducer";

const existingState = [
    {
        type: {
            name: "completed activity",
        },
        startTime: new Date(2021, 5, 1),
        endTime: new Date(2021, 5, 2),
        comment: "completed comment",
        id: "000",
        trashed: false,
    },
    {
        type: {
            name: "running activity",
        },
        startTime: new Date(),
        endTime: null,
        comment: "running comment",
        id: "001",
        trashed: true,
    },
];
const existingCount = 2;

// ============================== startActivity ==============================
test("starts new activity with valid info, expects activity to be purely added without endTime", () => {
    const newActivity = {
        type: { name: "Coding" },
        id: "003",
    };

    const newState = startActivity(existingState, newActivity);

    const addedActivity = newState.find((act) => act.id === newActivity.id);
    expect(addedActivity).toBeTruthy();

    expectActivityToBeInNewState(newActivity, newState);
    expectActivityHasRequiredFields(addedActivity);
    expectActivityRunning(addedActivity);

    expectExistingToBePure();
});

test("starts null activity, expects error to be thrown and pure state", () => {
    expect(() => startActivity(existingState, null)).toThrowError();

    expectExistingToBePure();
});

test("starts new activity with missing type, expects error to be thrown and pure state", () => {
    const newActivity = {
        type: null,
    };

    expect(() => startActivity(existingState, newActivity)).toThrowError();

    expectExistingToBePure();
});

// ============================== startActivity ==============================
test("creates completed activity with valid info, expects activity to be added and pure state", () => {
    const newActivity = {
        type: { name: "Stuff and things" },
        id: "004",
        startTime: new Date(2021, 8, 1),
        endTime: new Date(2021, 8, 1, 10),
        comment: "this is a comment",
    };

    const newState = createCompletedActivity(existingState, newActivity);

    const addedActivity = newState.find((act) => act.id === newActivity.id);
    expect(addedActivity).toBeTruthy();

    expectActivityToBeInNewState(newActivity, newState);
    expectActivityHasRequiredFields(addedActivity);
    expectActivityCompleted(addedActivity);

    expectExistingToBePure();
});

test("creates null completed activity, expects error to be thrown and pure state", () => {
    expect(() => createCompletedActivity(existingState, null)).toThrowError();

    expectExistingToBePure();
});

test("creates completed activity missing endTime, expects error to be thrown", () => {
    const newActivity = {
        type: { name: "Stuff and things" },
        id: "004",
        startTime: new Date(2021, 8, 1),
        comment: "this is a comment",
    };

    expect(() =>
        createCompletedActivity(existingState, newActivity)
    ).toThrowError();
    expectExistingToBePure();
});

test("creates completed activity missing startTime, expects error to be thrown", () => {
    const newActivity = {
        type: { name: "Stuff and things" },
        id: "004",
        endTime: new Date(2021, 8, 1, 10),
        comment: "this is a comment",
    };

    expect(() =>
        createCompletedActivity(existingState, newActivity)
    ).toThrowError();

    expectExistingToBePure();
});

test("creates completed activity missing type, expects error to be thrown", () => {
    const newActivity = {
        id: "004",
        startTime: new Date(2021, 8, 1),
        endTime: new Date(2021, 8, 1, 10),
        comment: "this is a comment",
    };
    expect(() =>
        createCompletedActivity(existingState, newActivity)
    ).toThrowError();
    expectExistingToBePure();
});

// ============================== stopActivity ==============================
test("stops running activity, expects endTime to be set", () => {
    const runningActivity = existingState[1];
    expect(runningActivity.endTime).toBeFalsy();

    const newState = stopActivity(existingState, runningActivity.id);

    const stoppedActivity = newState.find(
        (act) => act.id === runningActivity.id
    );
    expect(stoppedActivity).toBeTruthy();

    expect(stoppedActivity.endTime).toBeTruthy();

    expectExistingToBePure();
});

test("stops completed activity, expects endTime to be updated", () => {
    const completedActivity = existingState[0];
    const inititalEndTime = completedActivity.endTime;

    const newState = stopActivity(existingState, completedActivity.id);

    const stoppedActivity = newState.find(
        (act) => act.id === completedActivity.id
    );
    expect(stoppedActivity).toBeTruthy();

    expect(stoppedActivity.endTime).not.toEqual(inititalEndTime);

    expectExistingToBePure();
});

test("stops activity with invalid id, expects error to be thrown", () => {
    expect(() => stopActivity(existingState, -99)).toThrowError();

    expectExistingToBePure();
});

// ============================== resumeActivity ==============================
test("resumes completed activity, expects endTime to be null", () => {
    const completedActivity = existingState[0];
    expect(completedActivity.endTime).toBeTruthy();

    const newState = resumeActivity(existingState, completedActivity.id);

    const resumedActivity = newState.find(
        (act) => act.id === completedActivity.id
    );
    expect(resumedActivity).toBeTruthy();

    expectActivityRunning(resumedActivity);

    expectExistingToBePure();
});

test("resumes running activity, expects no change to activity", () => {
    const runningActivity = existingState[1];
    expectActivityRunning(runningActivity);

    const newState = resumeActivity(existingState, runningActivity.id);

    const resumedActivity = newState.find(
        (act) => act.id === runningActivity.id
    );
    expect(resumedActivity).toEqual(runningActivity);

    expectExistingToBePure();
});

test("resumes activity with invalid id, expects error to be thrown", () => {
    expect(() => resumeActivity(existingState, -99)).toThrowError();

    expectExistingToBePure();
});

// ============================== trashActivity ==============================
test("trashes non-trashed activity with valid id, expects trash to be true", () => {
    const nonTrashedActivity = existingState[0];
    expectActivityNotTrashed(nonTrashedActivity);

    const newState = trashActivity(existingState, nonTrashedActivity.id);

    const trashedActivity = newState.find(
        (act) => act.id === nonTrashedActivity.id
    );
    expect(trashedActivity).toBeTruthy();

    expectActivityTrashed(trashedActivity);

    expectExistingToBePure();
});

test("trashes non-trashed activity with invalid id, expects error to be thrown", () => {
    expect(() => trashActivity(existingState, -99)).toThrowError();

    expectExistingToBePure();
});

const expectExistingToBePure = () => {
    expect(existingState.length).toBe(existingCount);
};

const expectActivityToBeInNewState = (activity, newState) => {
    const inState = newState.some((act) => act.id === activity.id);
    expect(inState).toBeTruthy();
};

const expectActivityHasRequiredFields = (activity) => {
    expect(activity.type).toBeTruthy();
    expect(activity.startTime).toBeTruthy();
    expect(activity.comment).not.toBeNull();
    expect(activity.comment).not.toBeUndefined();
    expect(activity.id).not.toBeNull();
    expect(activity.id).not.toBeUndefined();
    expect(activity.trashed).not.toBeNull();
    expect(activity.trashed).not.toBeUndefined();
};

const expectActivityRunning = (activity) =>
    expect(activity.endTime).toBeFalsy();

const expectActivityCompleted = (activity) =>
    expect(activity.endTime).toBeTruthy();

const expectActivityNotTrashed = (activity) =>
    expect(activity.trashed).toBeFalsy();

const expectActivityTrashed = (activity) =>
    expect(activity.trashed).toBeTruthy();
