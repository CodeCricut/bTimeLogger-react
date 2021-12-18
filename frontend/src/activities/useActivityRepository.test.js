import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { useActivityRepository, repo } from "./useActivityRepository";
import { allActivities } from "../test-helpers/fixtures/activities.js";
import { jest, expect, describe, it } from "@jest/globals";

import enzyme, { mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
enzyme.configure({ adapter: new Adapter() });

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

    if (state.error) return <div>Error</div>;
    if (state.isLoading) return <div>Loading</div>;
    return <div>{state.activities.length} activities</div>;
}

let container = null;

beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const GET_ALL_LOADING_TIME = 500;

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

describe("useActivityRepository", () => {
    describe("dependencyArray", () => {
        it("should load activites after some time", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                getAllActivitesReturnAllMock
            );
            // https://stackoverflow.com/a/59085508
            const component = await mount(<TestComponent />);
            const div = component.find("div");

            expect(div.text()).toEqual("Loading");

            await act(() => sleepUntilGetAllLoaded());
            expect(div.text()).toEqual(`${allActivities.length} activities`);

            // expect(wrapper.text).toEqual(`${allActivities.length} activities`);

            // act(() => {
            //     render(<TestComponent />, container);
            // });

            // Should be loading at first
            // expect(container.textContent).toBe("Loading");

            // // Should have loaded activities after time
            // await act(() => sleepUntilGetAllLoaded());
            // expect(container.textContent).toBe(
            //     `${allActivities.length} activities`
            // );
        });

        it("should display error after some time", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                getAllActivitesThrowErrorMock
            );
            const component = await mount(<TestComponent />);
            const div = component.find("div");

            expect(div.text()).toEqual("Loading");

            await act(() => sleepUntilGetAllLoaded());
            expect(div.text()).toEqual("Error");
            // act(() => {
            //     render(<TestComponent />, container);
            // });

            // Should be loading at first
            // expect(container.textContent).toBe("Loading");

            // // Should have loaded activities after time
            // await act(() => sleepUntilGetAllLoaded());
            // expect(container.textContent).toBe("Error");
        });
    });

    describe("reloadAll", () => {
        it("loads all activities and sets them in state", async () => {
            jest.spyOn(repo, "getAll").mockImplementation(
                getAllActivitesReturnEmptyMock
            );

            const component = await mount(<TestComponent />);
            const div = component.find("div");
            await act(() => sleepUntilGetAllLoaded());

            // Should have no activities at first
            expect(div.text()).toEqual("0 activities");

            // Reload all
            jest.spyOn(repo, "getAll").mockImplementation(
                getAllActivitesReturnAllMock
            );
            await act(() => component.instance().reloadAll());

            // Should have loaded activities
            expect(div.text()).toEqual(`${allActivities.length} activities`);

            // await act(async () => {`
            //     render(<TestComponent />, container);
            //     await sleepUntilGetAllLoaded();
            // });
            // Should have no activities at first
            // expect(container.textContent).toBe("0 activities");

            // // Should have loaded activities after time
            // expect(container.textContent).toBe(
            //     `${allActivities.length} activities`
            // );
        });

        it("returns loaded activities", () => {});
    });
});
