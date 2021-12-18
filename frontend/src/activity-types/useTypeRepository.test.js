import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { jest, expect, describe, it } from "@jest/globals";

import { useTypeRepository, repo } from "./useTypeRepository";

import { allTypes } from "../test-helpers/fixtures/activity-types";
const type = allTypes[0];

function TestComponent(props) {
    const [state, { reloadAllTypes, reloadOneType, addType, removeType }] =
        useTypeRepository();

    return (
        <div>
            <button
                data-testid="reloadAllTypes"
                onClick={async () => await reloadAllTypes()}
            >
                Reload all types
            </button>
            <button
                data-testid="reloadOneType"
                onClick={async () => await reloadOneType(type._id)}
            >
                Reload one type
            </button>

            <button
                data-testid="addType"
                onClick={async () => await addType(type)}
            >
                Add type
            </button>

            <button
                data-testid="removeType"
                onClick={async () => await removeType(type)}
            >
                Remove type
            </button>

            {state.error && <div>Error</div>}
            {state.isLoading && <div>Loading</div>}
            <div>{state.types.length} types</div>
        </div>
    );
}

const LOADING_TIME = 50;

// TODO: replace these with mock.resolveValue ...
const returnAllTypesAsync = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve(allTypes), LOADING_TIME);
    });

const returnEmptyArrayAsync = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve([]), LOADING_TIME);
    });

const throwErrorAsync = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("error")), LOADING_TIME);
    });

const returnOneTypeAsync = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(type), LOADING_TIME);
    });
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleepUntilGetAllLoaded() {
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

describe("useTypeRepository", () => {
    describe("initial load behavior", () => {
        it("is loading at first", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(returnAllTypesAsync);
            render(<TestComponent />);

            screen.getByText("Loading");
        });

        it("loads activities after some time", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(returnAllTypesAsync);
            render(<TestComponent />);

            await sleepUntilGetAllLoaded();

            screen.getByText(`${allTypes.length} types`);
        });

        it("displays errors after some time", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(throwErrorAsync);
            render(<TestComponent />);

            await sleepUntilGetAllLoaded();
            screen.getByText("Error");
        });
    });

    describe("reloadAllTypes", () => {
        it("loads all activity types and sets them in state", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                returnEmptyArrayAsync
            );
            render(<TestComponent />);

            // Should have none at first
            await sleepUntilGetAllLoaded();
            screen.getByText("0 types");

            // Reload all
            jest.spyOn(repo, "getAll").mockImplementation(returnAllTypesAsync);
            fireEvent.click(screen.getByTestId("reloadAllTypes"));
            await sleepUntilGetAllLoaded();

            // Expect to have loaded types
            screen.getByText(`${allTypes.length} types`);
        });

        it("sets error if couldn't load all", async () => {});
    });

    describe("reloadOneType", () => {
        it("loads one activity type and adds it to the state", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                returnEmptyArrayAsync
            );
            render(<TestComponent />);

            // Should have none at first
            await sleepUntilGetAllLoaded();
            screen.getByText("0 types");

            // Reload one
            jest.spyOn(repo, "getById").mockImplementation(returnOneTypeAsync);
            fireEvent.click(screen.getByTestId("reloadOneType"));
            await sleepUntilGetAllLoaded();

            // Expect to have loaded types
            screen.getByText(`1 types`);
        });

        it("does not change state if activity type already loaded", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                returnEmptyArrayAsync
            );
            render(<TestComponent />);
            jest.spyOn(repo, "getById").mockImplementation(returnOneTypeAsync);
            fireEvent.click(screen.getByTestId("reloadOneType"));

            // Should have one loaded already
            await sleepUntilGetAllLoaded();
            screen.getByText(`1 types`);

            // Reload one again
            fireEvent.click(screen.getByTestId("reloadOneType"));
            await sleepUntilGetAllLoaded();

            // Should not change state
            screen.getByText(`1 types`);
        });

        it("sets error if couldn't load one", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                returnEmptyArrayAsync
            );
            render(<TestComponent />);
            jest.spyOn(repo, "getById").mockImplementation(throwErrorAsync);

            // Try load one
            fireEvent.click(screen.getByTestId("reloadOneType"));
            await sleepUntilGetAllLoaded();

            // Should set error
            screen.getByText("Error");
        });
    });

    describe("addType", () => {
        it("adds one activity type", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                returnEmptyArrayAsync
            );
            render(<TestComponent />);

            // Should have none at first
            await sleepUntilGetAllLoaded();
            screen.getByText("0 types");

            // Add one
            jest.spyOn(repo, "add").mockImplementation(returnOneTypeAsync);
            fireEvent.click(screen.getByTestId("addType"));
            await sleepUntilGetAllLoaded();

            // Expect to have added types
            screen.getByText(`1 types`);
        });

        it("sets error if couldn't add one", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                returnEmptyArrayAsync
            );
            render(<TestComponent />);

            // Should have none at first
            await sleepUntilGetAllLoaded();
            screen.getByText("0 types");

            // Add one
            jest.spyOn(repo, "add").mockImplementation(throwErrorAsync);
            fireEvent.click(screen.getByTestId("addType"));
            await sleepUntilGetAllLoaded();

            // Expect to have added types
            screen.getByText(`Error`);
        });
    });

    describe("removeType", () => {
        it("removes one activity type", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                returnEmptyArrayAsync
            );
            render(<TestComponent />);

            // Add one
            jest.spyOn(repo, "add").mockImplementation(returnOneTypeAsync);
            fireEvent.click(screen.getByTestId("addType"));
            await sleepUntilGetAllLoaded();
            screen.getByText(`1 types`);

            // Remove one
            jest.spyOn(repo, "remove").mockImplementation(() => {
                /* doesn't need to do anything; hook should remove type from reducer state */
            });
            fireEvent.click(screen.getByTestId("removeType"));
            await sleepUntilGetAllLoaded();
            screen.getByText("0 types");
            // TODO: ensure repo.remove called at least once
        });

        it("sets error if couldn't remove one", async () => {});
    });
});
