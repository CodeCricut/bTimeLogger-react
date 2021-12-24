import moment from "moment";
import { formatDate, formatQueryDate } from "../util/timeFormatters";
import SearchParams from "./SearchParams";
import {
    startTime as startTimeString,
    endTime as endTimeString,
} from "../test-helpers/fixtures/dates.js";
import { describe, it } from "@jest/globals";
import { searchParams } from "../test-helpers/fixtures/search-params";
import { expectSearchParamsEqual } from "../test-helpers/util/expect-helpers";

describe("constructor", () => {
    it("initializes with default values", () => {
        const expected = new SearchParams();
        expected.searchTerm = "";
        expected.selectedType = "";
        expected.fromDate = null;
        expected.toDate = null;

        const actual = new SearchParams();

        expectSearchParamsEqual(expected, actual);
    });

    it("copies fields from other search params", () => {
        const actual = new SearchParams(searchParams);
        expectSearchParamsEqual(searchParams, actual);
    });
});

describe("get queryString", () => {
    it("returns selected type if given", () => {
        const selectedType = "SELECTED TYPE";
        const params = new SearchParams();
        params.selectedType = selectedType;
        const queryString = params.queryString;

        expect(queryString).toEqual(`selectedType=${selectedType}`);
    });

    it("does not return selected type if not given", () => {
        const params = new SearchParams();
        params.selectedType = "";
        const queryString = params.queryString;

        expect(queryString.includes("selectedType")).toBe(false);
    });

    it("returns from date if given", () => {
        const params = new SearchParams();
        params.fromDate = new Date(startTimeString);
        const queryString = params.queryString;

        expect(queryString).toEqual(`fromDate=${startTimeString}`);
    });

    it("does not return from date if not given", () => {
        const params = new SearchParams();
        params.fromDate = null;
        const queryString = params.queryString;

        expect(queryString.includes("fromDate")).toBe(false);
    });

    it("returns to date if given", () => {
        const params = new SearchParams();
        params.toDate = new Date(endTimeString);
        const queryString = params.queryString;

        expect(queryString).toEqual(`toDate=${endTimeString}`);
    });

    it("does not return to date if not given", () => {
        const params = new SearchParams();
        params.toDate = null;
        const queryString = params.queryString;

        expect(queryString.includes("toDate")).toBe(false);
    });

    it("returns search term if given", () => {
        const searchTerm = "SEARCH TERM";
        const params = new SearchParams();
        params.searchTerm = searchTerm;
        const queryString = params.queryString;

        expect(queryString).toEqual(`searchTerm=${searchTerm}`);
    });

    it("does not return search term if not given", () => {
        const params = new SearchParams();
        params.searchTerm = "";
        const queryString = params.queryString;

        expect(queryString.includes("searchTerm")).toBe(false);
    });

    it("returns fields delimited with ampersands", () => {
        const queryString = searchParams.queryString;
        const expectedFromDateString = formatQueryDate(searchParams.fromDate);
        const expectedToDateString = formatQueryDate(searchParams.toDate);
        expect(queryString).toEqual(
            `selectedType=${searchParams.selectedType}&fromDate=${expectedFromDateString}&toDate=${expectedToDateString}&searchTerm=${searchParams.searchTerm}`
        );
    });
});

describe("get doSearchBetweenDates", () => {
    it("returns true if from date not null", () => {
        const params = new SearchParams(searchParams);
        params.toDate = null;
        expect(params.doSearchBetweenDates).toBe(true);
    });

    it("returns true if to date not null", () => {
        const params = new SearchParams(searchParams);
        params.fromDate = null;

        expect(params.doSearchBetweenDates).toBe(true);
    });

    it("returns false if dates null", () => {
        const params = new SearchParams(searchParams);
        params.fromDate = null;
        params.toDate = null;
        expect(params.doSearchBetweenDates).toBe(false);
    });
});

describe("parseQueryString", () => {
    it("populates searchTerm if no keys given", () => {
        const queryString = "SEARCH TERM";
        const params = SearchParams.parseQueryString(queryString);

        expect(params.queryString).toEqual(`searchTerm=${queryString}`);
    });

    it("populates fromDate with date object", () => {
        const params = SearchParams.parseQueryString(
            `fromDate=${endTimeString}`
        );

        expect(params.fromDate).toEqual(new Date(endTimeString));
    });

    it("populates toDate with date object", () => {
        const params = SearchParams.parseQueryString(
            `toDate=${startTimeString}`
        );

        expect(params.toDate).toEqual(new Date(startTimeString));
    });

    it("populates selectedType with value", () => {
        const selectedType = "SELECTED TYPE";
        const params = SearchParams.parseQueryString(
            `selectedType=${selectedType}`
        );

        expect(params.selectedType).toEqual(selectedType);
    });

    it("parses query string delimitted with ampersands", () => {
        const expected = searchParams;
        const actual = SearchParams.parseQueryString(searchParams.queryString);

        expectSearchParamsEqual(expected, actual);
    });
});
