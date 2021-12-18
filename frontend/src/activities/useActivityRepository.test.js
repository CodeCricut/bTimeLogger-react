import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { jest, expect, describe, it } from "@jest/globals";

import { useActivityRepository, repo } from "./useActivityRepository";
import { allActivities } from "../test-helpers/fixtures/activities.js";

function TestComponent(props) {
    const [
        state,
        {
            reloadAll,
            reloadOne,
            startNew,
            createCompleted,
            stopActivity,
            resumeActivity,
            trashActivity,
            untrashActivity,
            updateActivity,
            removeActivity,
        },
    ] = useActivityRepository();

    return (
        <div>
            <button data-testid="reloadAll" onClick={reloadAll}>
                Reload all
            </button>
            {state.error && <div>Error</div>}
            {state.isLoading && <div>Loading</div>}
            <div>{state.activities.length} activities</div>
        </div>
    );
}

const GET_ALL_LOADING_TIME = 50;

const getAllActivitesReturnAllMock = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve(allActivities), GET_ALL_LOADING_TIME);
    });

const getAllActivitesReturnEmptyMock = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve([]), GET_ALL_LOADING_TIME);
    });

const getAllActivitesThrowErrorMock = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("error")), GET_ALL_LOADING_TIME);
    });

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleepUntilGetAllLoaded() {
    return sleep(GET_ALL_LOADING_TIME * 2);
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

describe("useActivityRepository", () => {
    describe("dependencyArray", () => {
        it("should load activites after some time", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                getAllActivitesReturnAllMock
            );
            render(<TestComponent />);

            expect(screen.queryByText("Loading")).not.toBeNull();

            await sleepUntilGetAllLoaded();

            expect(
                screen.queryByText(`${allActivities.length} activities`)
            ).not.toBeNull();
        });

        it("should display error after some time", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                getAllActivitesThrowErrorMock
            );
            render(<TestComponent />);
            expect(screen.queryByText("Loading")).not.toBeNull();

            await sleepUntilGetAllLoaded();

            expect(screen.queryByText("Error")).not.toBeNull();
        });
    });

    describe("reloadAll", () => {
        it("loads all activities and sets them in state", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                getAllActivitesReturnEmptyMock
            );

            render(<TestComponent />);
            await sleepUntilGetAllLoaded();
            expect(screen.queryByText("0 activities")).not.toBeNull();

            // Reload all
            jest.spyOn(repo, "getAll").mockImplementation(
                getAllActivitesReturnAllMock
            );
            fireEvent.click(screen.getByTestId("reloadAll"));
            await sleepUntilGetAllLoaded();

            // Expect to have loaded acts
            expect(
                screen.queryByText(`${allActivities.length} activities`)
            ).not.toBeNull();
        });

        it("returns loaded activities", () => {});
    });
});
