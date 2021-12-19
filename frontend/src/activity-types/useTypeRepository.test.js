import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { jest, expect, describe, it } from "@jest/globals";
import { renderHook, act } from "@testing-library/react-hooks";

import { useTypeRepository, repo } from "./useTypeRepository";

import {
    allTypes,
    readingType,
    codingType,
    invalidType,
    emptyTypes,
} from "../test-helpers/fixtures/activity-types";
import { ActivityTypeRepository } from "./ActivityTypeRepository";

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

const repoMock = new ActivityTypeRepository();

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

describe("useTypeRepository", () => {
    describe("initial load behavior", () => {
        it("is loading at first", async () => {
            jest.spyOn(repoMock, "getAll").mockReturnValue(
                resolveAfterLoadingTime(allTypes)
            );
            const { result } = renderHook(() => useTypeRepository(repoMock));
            let [state] = result.current;

            expect(state.isLoading).toBe(true);

            await sleepUntilLoaded();

            [state] = result.current;
            expect(state.isLoading).toBe(false);
        });

        it("loads types after some time", async () => {
            jest.spyOn(repoMock, "getAll").mockReturnValue(
                resolveAfterLoadingTime(allTypes)
            );
            const { result } = renderHook(() => useTypeRepository(repoMock));
            let [state] = result.current;
            expect(state.types.length).toBe(0);

            await sleepUntilLoaded();

            [state] = result.current;
            expect(state.types.length).toBe(allTypes.length);
        });

        it("has error after some time", async () => {
            jest.spyOn(repoMock, "getAll").mockImplementation(throwErrorAsync);

            const { result } = renderHook(() => useTypeRepository(repoMock));
            let [state] = result.current;

            expect(state.error).toBeNull();

            await sleepUntilLoaded();

            [state] = result.current;
            expect(state.error).not.toBeNull();
        });
    });

    describe("reloadAllTypes", () => {
        it("loads all activity types and sets them in state", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue(emptyTypes);
            const { result } = renderHook(() => useTypeRepository(repoMock));

            // Should be empty at first
            let [state, { reloadAllTypes }] = result.current;
            expect(state.types.length).toBe(0);

            // Reload types
            jest.spyOn(repoMock, "getAll").mockResolvedValue(allTypes);
            await act(async () => await reloadAllTypes());

            // Expect types to be loaded
            [state] = result.current;
            expect(state.types.length).toBe(allTypes.length);
        });

        it("sets error if couldn't load all", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue(emptyTypes);
            const { result } = renderHook(() => useTypeRepository(repoMock));
            let [state, { reloadAllTypes }] = result.current;

            // Reload types
            jest.spyOn(repoMock, "getAll").mockRejectedValue(new Error());
            await act(async () => await reloadAllTypes());

            // Expect error
            [state] = result.current;
            expect(state.error).not.toBeNull();
        });
    });

    describe("reloadOneType", () => {
        it("loads one activity type and adds it to the state", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue(emptyTypes);

            const { result } = renderHook(() => useTypeRepository(repoMock));
            let [state, { reloadOneType }] = result.current;

            // Should have none at first
            expect(state.types.length).toBe(0);

            // Reload one
            const reloadedType = codingType;
            jest.spyOn(repoMock, "getById").mockResolvedValue(reloadedType);
            await act(async () => await reloadOneType(reloadedType._id));

            // Expect to have loaded types
            [state] = result.current;
            expect(state.types).toContain(reloadedType);
        });

        it("does not change state if activity type already loaded", async () => {
            const originalType = codingType;
            const newType = { ...readingType, _id: originalType._id };

            jest.spyOn(repoMock, "getAll").mockResolvedValue([originalType]);
            const { result } = renderHook(() => useTypeRepository(repoMock));
            await sleepUntilLoaded();

            let [state, { reloadOneType }] = result.current;

            // Expect to have the type already
            expect(state.types).toContain(originalType);

            // Reload type with same id
            jest.spyOn(repoMock, "getById").mockResolvedValue(newType);
            await act(async () => await reloadOneType(originalType._id));

            [state] = result.current;

            // Expect updated type to be present
            expect(state.types).toContain(newType);

            // Do not expect original type
            expect(state.types).not.toContain(originalType);
        });

        it("sets error if couldn't load one", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue([codingType]);
            const { result } = renderHook(() => useTypeRepository(repoMock));

            let [state, { reloadOneType }] = result.current;

            // Load will throw error
            jest.spyOn(repoMock, "getById").mockRejectedValue(new Error());
            await act(async () => await reloadOneType(codingType._id));

            // Expect error in state
            [state] = result.current;
            expect(state.error).not.toBeNull();
        });
    });

    describe("addType", () => {
        it("adds one activity type", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue(emptyTypes);

            const { result } = renderHook(() => useTypeRepository(repoMock));
            await sleepUntilLoaded();
            let [state, { addType }] = result.current;

            // Should have none at first
            expect(state.types.length).toBe(0);

            // Add one
            const addedType = codingType;
            jest.spyOn(repoMock, "add").mockResolvedValue(addedType);
            await act(async () => await addType(addedType));

            // Expect to have added types
            await sleepUntilLoaded();
            [state] = result.current;
            expect(state.types).toContain(addedType);
        });

        it("sets error if couldn't add one", async () => {
            jest.spyOn(repoMock, "getAll").mockResolvedValue(emptyTypes);

            const { result } = renderHook(() => useTypeRepository(repoMock));

            let [state, { addType }] = result.current;

            // Add will throw
            jest.spyOn(repoMock, "add").mockRejectedValue(new Error());
            await act(async () => await addType(codingType));

            // Expect to have error
            await sleepUntilLoaded();
            [state] = result.current;
            expect(state.error).not.toBeNull();
        });
    });

    describe("removeType", () => {
        it("removes one activity type", async () => {
            const originalType = codingType;
            jest.spyOn(repoMock, "getAll").mockResolvedValue([originalType]);
            const { result } = renderHook(() => useTypeRepository(repoMock));
            await sleepUntilLoaded();

            let [state, { removeType }] = result.current;

            // Expect to have the type already
            expect(state.types).toContain(originalType);

            // Remove type
            jest.spyOn(repoMock, "remove").mockResolvedValue();
            await act(async () => await removeType(originalType));
            [state] = result.current;

            // Expect type to be removed
            expect(state.types).not.toContain(originalType);
        });

        it("sets error if couldn't remove one", async () => {
            const originalType = codingType;
            jest.spyOn(repoMock, "getAll").mockResolvedValue([originalType]);
            const { result } = renderHook(() => useTypeRepository(repoMock));

            let [state, { removeType }] = result.current;

            // Remove type will throw error
            jest.spyOn(repoMock, "remove").mockRejectedValue(new Error());

            // Remove type
            await act(async () => await removeType(originalType));

            // Expect error
            [state] = result.current;
            expect(state.error).not.toBeNull();

            // Expect type to still be in state
            expect(state.types).toContain(originalType);
        });
    });
});
