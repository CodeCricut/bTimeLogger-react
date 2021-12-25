import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Allows us to mock the behavior of axios (used for API calls)
const axiosMock = new MockAdapter(axios);

function onGetAllTypes() {
    return axiosMock.onGet("/types");
}

function onGetType(id) {
    return axiosMock.onGet(`/types/${id}`);
}

function returnOnGetByName(name, responseCode, responseBody) {
    axiosMock.onGet(`/types`).reply((config) => {
        if (config.params.name === name) return [responseCode, responseBody];
        else return [404];
    });
}

function onAddType() {
    return axiosMock.onPost(`/types/add`);
}

function onRemoveType(id) {
    return axiosMock.onDelete(`/types/remove/${id}`);
}

export { onGetAllTypes, onGetType, returnOnGetByName, onAddType, onRemoveType };
