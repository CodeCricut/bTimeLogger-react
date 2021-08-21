import moment from "moment";
import { formatDate } from "../util/timeFormatters";
import SearchParams from "./SearchParams";

const selectedTypeNoSpace = "test-selected-type";
const fromDate = new Date(1999, 10, 1);
const toDate = new Date(1999, 10, 3);

// get queryString
test("queryString should return in `type:myType` format if not doSearchBetweenDates", () => {
    const params = new SearchParams();
    params.selectedType = selectedTypeNoSpace;
    const queryString = params.queryString;

    expect(queryString).toEqual(`type:${selectedTypeNoSpace}`);
});

test("queryString should return in `type:myType&from-date:myFromDate&to-date:myToDate` format if doSearchBetweenDates", () => {
    const params = new SearchParams();
    params.selectedType = selectedTypeNoSpace;
    params.fromDate = fromDate;
    params.toDate = toDate;
    params.doSearchBetweenDates = true;

    const queryString = params.queryString;

    expect(queryString).toEqual(
        `type:${selectedTypeNoSpace}&from-date:${formatDate(
            fromDate
        )}&to-date:${formatDate(toDate)}`
    );
});

// parseQueryString
test("parseQueryString should return ['type': myType] dictionary if not doSearchBetweenDates", () => {
    const params = new SearchParams();
    params.selectedType = selectedTypeNoSpace;
    const queryString = params.queryString;

    const kvp = SearchParams.parseQueryString(queryString);

    expect(Object.keys(kvp).length).toBe(1);
    expect(kvp["selectedType"]).toBe(selectedTypeNoSpace);
});

test("parseQueryString should return ['selectedType':myType, 'from-date': fromDate, 'to-date': toDate] dictionary if doSearchBetweenDates", () => {
    const params = new SearchParams();
    params.selectedType = selectedTypeNoSpace;
    params.fromDate = fromDate;
    params.toDate = toDate;
    params.doSearchBetweenDates = true;

    const queryString = params.queryString;

    const kvp = SearchParams.parseQueryString(queryString);

    expect(Object.keys(kvp).length).toBe(3);

    expect(kvp["type"]).toEqual(selectedTypeNoSpace);
    expect(moment(kvp["from-date"]).isSame(moment(fromDate))).toBeTruthy();
    expect(moment(kvp["to-date"]).isSame(moment(toDate))).toBeTruthy();
});
