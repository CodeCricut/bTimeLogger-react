import { jest, expect, describe, it } from "@jest/globals";
import { renderHook, act } from "@testing-library/react-hooks";

import { useActivityRepository } from "./useActivityRepository";
import {
    allActivities,
    completedStudyingActivity,
    invalidDateActivity,
    invalidIdActivity,
    invalidTypeActivity,
    startedExerciseActivity,
    trashedCodingActivity,
} from "../test-helpers/fixtures/activities.js";
import { ActivityRepository } from "./ActivityRepository";
import { endTime } from "../test-helpers/fixtures/dates";

const LOADING_TIME = 50;

const resolveAfter = (resolveValue, loadingTime) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(resolveValue), loadingTime);
    });
};

const resolveAfterLoadingTime = (resolveValue) =>
    resolveAfter(resolveValue, LOADING_TIME);

const throwErrorAsync = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("error")), LOADING_TIME);
    });

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleepUntilLoaded() {
    return sleep(LOADING_TIME * 2);
}

// This is a compatibility fix for react-testing-library. See also: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});

const repoMock = new ActivityRepository();

describe("useActivityRepository", () => {
    describe("initial load behavior", () => {
        it("is loading at first", async () => {
            jest.spyOn(repoMock, "getAll").mockReturnValue(
                resolveAfterLoadingTime(allActivities)
            );
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            let [state] = result.current;

            // Wait until loaded
            await sleepUntilLoaded();

            // Should be loaded
            [state] = result.current;
            expect(state.activities.length).toBe(allActivities.length);
            expect(state.isLoading).toBe(false);
        });

        it("loads activites after some time", async () => {
            jest.spyOn(repoMock, "getAll").mockReturnValue(
                resolveAfterLoadingTime(allActivities)
            );
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            let [state] = result.current;

            // Wait until loaded
            await sleepUntilLoaded();

            // Should be loaded
            [state] = result.current;
            expect(state.activities.length).toBe(allActivities.length);
            expect(state.isLoading).toBe(false);
        });

        it("has error after some time", async () => {
            jest.spyOn(repoMock, "getAll").mockReturnValue(throwErrorAsync);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            let [state] = result.current;

            // Wait until loaded
            await sleepUntilLoaded();

            // Should have error
            [state] = result.current;
            expect(state.error).not.toBeNull();
        });
    });

    describe("reloadAllActivities", () => {
        it("loads all activities and sets them in state", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue([]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );

            // Should be empty at first
            let [state, { reloadAllActivities }] = result.current;
            expect(state.activities.length).toBe(0);

            // Reload activities
            jest.spyOn(repoMock, "getAll").mockResolvedValue(allActivities);
            await act(async () => await reloadAllActivities());

            // Expect activities to be loaded
            [state] = result.current;
            expect(state.activities.length).toBe(allActivities.length);
        });

        it("sets error if couldn't load all", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue([]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            let [state, { reloadAllActivities }] = result.current;

            // Reload activities
            jest.spyOn(repoMock, "getAll").mockRejectedValue(new Error());
            await act(async () => await reloadAllActivities());

            // Expect error
            [state] = result.current;
            expect(state.error).not.toBeNull();
        });
    });

    describe("reloadOneActivity", () => {
        it("loads one activity and adds it to the state", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue([]);

            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            let [state, { reloadOneActivity }] = result.current;

            // Should have none at first
            expect(state.activities.length).toBe(0);

            // Reload one
            const reloadedActivity = completedStudyingActivity;
            jest.spyOn(repoMock, "getById").mockResolvedValue(reloadedActivity);
            await act(
                async () => await reloadOneActivity(reloadedActivity._id)
            );
            await sleepUntilLoaded();

            // Expect to have loaded activities
            [state] = result.current;
            expect(state.activities).toContain(reloadedActivity);
        });

        it("does not change state if activity already loaded", async () => {
            const originalActivity = completedStudyingActivity;
            const newActivity = {
                ...startedExerciseActivity,
                _id: originalActivity._id,
            };

            jest.spyOn(repoMock, "getAll").mockResolvedValue([
                originalActivity,
            ]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            await sleepUntilLoaded();

            let [state, { reloadOneActivity }] = result.current;

            // Expect to have the activity already
            expect(state.activities).toContain(originalActivity);

            // Reload activity with same id
            jest.spyOn(repoMock, "getById").mockResolvedValue(newActivity);
            await act(
                async () => await reloadOneActivity(originalActivity._id)
            );

            [state] = result.current;

            // Expect updated activity to be present
            expect(state.activities).toContain(newActivity);

            // Do not expect original activity
            expect(state.activities).not.toContain(originalActivity);
        });

        it("sets error if couldn't load one", async () => {});
    });

    describe("startNewActivity", () => {
        it("should add started activity", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue([]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            await sleepUntilLoaded();
            let [state, { startNewActivity }] = result.current;

            // Should have none at first
            expect(state.activities.length).toBe(0);

            // Start new
            const addedActivity = startedExerciseActivity;
            jest.spyOn(repoMock, "startNew").mockResolvedValue(addedActivity);
            await act(async () => await startNewActivity(addedActivity));

            // Should have added activity
            await sleepUntilLoaded();
            [state] = result.current;
            expect(state.activities).toContain(addedActivity);
        });

        it("should set error if couldn't start activity", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue([]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            let [state, { startNewActivity }] = result.current;

            // Start new will throw
            const addedActivity = startedExerciseActivity;
            jest.spyOn(repoMock, "startNew").mockRejectedValue(new Error());
            await act(async () => await startNewActivity(addedActivity));

            await sleepUntilLoaded();
            [state] = result.current;

            // Should have error
            expect(state.error).not.toBeNull();

            // Should not have started type
            expect(state.activities).not.toContain(addedActivity);
        });
    });

    describe("createCompletedActivity", () => {
        it("should add completed activity", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue([]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            await sleepUntilLoaded();
            let [state, { createCompletedActivity }] = result.current;

            // Should have none at first
            expect(state.activities.length).toBe(0);

            // Create completed
            const createdActivity = completedStudyingActivity;
            jest.spyOn(repoMock, "createCompleted").mockResolvedValue(
                createdActivity
            );
            await act(
                async () => await createCompletedActivity(createdActivity)
            );

            // Should have started activity
            await sleepUntilLoaded();
            [state] = result.current;
            expect(state.activities).toContain(createdActivity);
        });

        it("should set error if couldn't create completed activity", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue([]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            let [state, { createCompletedActivity }] = result.current;

            // Create completed will throw error
            const createdActivity = completedStudyingActivity;
            jest.spyOn(repoMock, "createCompleted").mockRejectedValue(
                new Error()
            );
            await act(
                async () => await createCompletedActivity(createdActivity)
            );

            await sleepUntilLoaded();
            [state] = result.current;
            // Should have error
            expect(state.error).not.toBeNull();

            // Should not have started activity
            expect(state.activities).not.toContain(createdActivity);
        });
    });

    describe("stopActivity", () => {
        it("should stop activity", async () => {
            const activity = startedExerciseActivity;
            // Activity should not be stopped
            expect(activity.endTimeDate).toBeNull();

            jest.spyOn(repoMock, "getAll").mockResolvedValue([activity]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            await sleepUntilLoaded();

            let [state, { stopActivity }] = result.current;

            // Should have started activity
            expect(state.activities).toContain(activity);

            // Stop activity
            const expectedStoppedAct = { ...activity, endTime: endTime };
            jest.spyOn(repoMock, "stopActivity").mockResolvedValue(
                expectedStoppedAct
            );
            await act(async () => await stopActivity(activity._id));

            // Should have stopped activity
            await sleepUntilLoaded();
            [state] = result.current;
            expect(state.activities).toContain(expectedStoppedAct);

            // Should not have original started activity
            expect(state.activities).not.toContain(activity);
        });

        it("should set error if couldn't stop activity", async () => {
            const activity = startedExerciseActivity;
            jest.spyOn(repoMock, "getAll").mockResolvedValue([activity]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            let [state, { stopActivity }] = result.current;

            // Stop activity will throw error
            jest.spyOn(repoMock, "stopActivity").mockRejectedValue(new Error());
            await act(async () => await stopActivity(activity._id));

            await sleepUntilLoaded();
            [state] = result.current;
            // Should have error
            expect(state.error).not.toBeNull();

            // Should not remove or modify original equation
            expect(state.activities).toContain(activity);
        });
    });

    describe("resumeActivity", () => {
        it("should resume activity", async () => {
            const stoppedActivity = completedStudyingActivity;
            // Activity should be stopped
            expect(stoppedActivity.endTimeDate).not.toBeNull();

            jest.spyOn(repoMock, "getAll").mockResolvedValue([stoppedActivity]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            await sleepUntilLoaded();

            let [state, { resumeActivity }] = result.current;

            // Should have stopped activity
            expect(state.activities).toContain(stoppedActivity);

            // Resume activity
            const expectedResumedAct = { ...stoppedActivity, endTime: null };
            jest.spyOn(repoMock, "resumeActivity").mockResolvedValue(
                expectedResumedAct
            );
            await act(async () => await resumeActivity(stoppedActivity._id));

            // Should have resumed activity
            await sleepUntilLoaded();
            [state] = result.current;
            expect(state.activities).toContain(expectedResumedAct);

            // Should not have original stopped activity
            expect(state.activities).not.toContain(stoppedActivity);
        });

        it("should set error if couldn't resume activity", () => {
            // TODO
        });
    });

    describe("trashActivity", () => {
        it("should trash activity", async () => {
            const untrashedActivity = completedStudyingActivity;
            // Activity should not be trashed
            expect(untrashedActivity.trashed).toBe(false);

            jest.spyOn(repoMock, "getAll").mockResolvedValue([
                untrashedActivity,
            ]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            await sleepUntilLoaded();

            let [state, { trashActivity }] = result.current;

            // Should have untrashed activity
            expect(state.activities).toContain(untrashedActivity);

            // Trash activity
            const expectedTrashedAct = { ...untrashedActivity, trashed: true };
            jest.spyOn(repoMock, "trashActivity").mockResolvedValue(
                expectedTrashedAct
            );
            await act(async () => await trashActivity(untrashedActivity._id));

            await sleepUntilLoaded();
            [state] = result.current;
            // Should have trashed activity
            expect(state.activities).toContain(expectedTrashedAct);

            // Should not have original untrashed activity
            expect(state.activities).not.toContain(untrashedActivity);
        });

        it("should set error if couldn't trash activity", () => {
            // TODO
        });
    });

    describe("untrashActivity", () => {
        it("should untrash activity", async () => {
            const trashedActivity = trashedCodingActivity;
            // Activity should be trashed
            expect(trashedActivity.trashed).toBe(true);

            jest.spyOn(repoMock, "getAll").mockResolvedValue([trashedActivity]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            await sleepUntilLoaded();

            let [state, { untrashActivity }] = result.current;

            // Should have trashed activity
            expect(state.activities).toContain(trashedActivity);

            // Untrash activity
            const expectedUntrashedAct = {
                ...trashedActivity,
                trashed: false,
            };
            jest.spyOn(repoMock, "untrashActivity").mockResolvedValue(
                expectedUntrashedAct
            );
            await act(async () => await untrashActivity(trashedActivity._id));

            await sleepUntilLoaded();
            [state] = result.current;
            // Should have untrashed activity
            expect(state.activities).toContain(expectedUntrashedAct);

            // Should not have original trashed activity
            expect(state.activities).not.toContain(trashedActivity);
        });

        it("should set error if couldn't untrash activity", () => {
            // TODO
        });
    });

    describe("updateActivity", () => {
        it("should update activity", async () => {
            const originalActivity = trashedCodingActivity;
            jest.spyOn(repoMock, "getAll").mockResolvedValue([
                originalActivity,
            ]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            await sleepUntilLoaded();

            let [state, { updateActivity }] = result.current;

            // Should have original
            expect(state.activities).toContain(originalActivity);

            // Update activity
            const expectedUpdatedActivity = {
                ...completedStudyingActivity,
                _id: originalActivity._id,
            };
            jest.spyOn(repoMock, "updateActivity").mockResolvedValue(
                expectedUpdatedActivity
            );
            await act(
                async () => await updateActivity(expectedUpdatedActivity)
            );

            await sleepUntilLoaded();
            [state] = result.current;

            // Should have updated activity
            expect(state.activities).toContain(expectedUpdatedActivity);

            // Should not have original activity
            expect(state.activities).not.toContain(originalActivity);
        });

        it("should set error if couldn't update activity", () => {
            // TODO
        });
    });

    describe("removeActivity", () => {
        it("should remove activity from state", async () => {
            const originalActivity = trashedCodingActivity;
            jest.spyOn(repoMock, "getAll").mockResolvedValue([
                originalActivity,
            ]);
            const { result } = renderHook(() =>
                useActivityRepository(repoMock)
            );
            await sleepUntilLoaded();

            let [state, { removeActivity }] = result.current;

            // Should have original
            expect(state.activities).toContain(originalActivity);

            // Remove activity

            jest.spyOn(repoMock, "removeActivity").mockResolvedValue();
            await act(async () => await removeActivity(originalActivity));

            await sleepUntilLoaded();
            [state] = result.current;

            // Should not have original activity
            expect(state.activities).not.toContain(originalActivity);
        });

        it("should set error if couldn't remove activity", () => {
            // TODO
        });
    });
});
