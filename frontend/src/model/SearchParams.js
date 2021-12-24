import { formatQueryDate } from "../util/timeFormatters";

/**
 * Parameters for searching for activities.
 */
export default class SearchParams {
    searchTerm = "";
    selectedType = "";
    fromDate = null;
    toDate = null;

    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    /**
     * Get a query string in the format of `selectedType={selected type}&fromDate={from date}&toDate={to date}&searchTerm={search term}`.
     * When a field is null or empty, then the query string will not contain that part of the string.
     */
    get queryString() {
        let queryStr = "";
        if (this.selectedType) queryStr += `selectedType=${this.selectedType}&`;
        if (this.fromDate)
            queryStr += `fromDate=${formatQueryDate(this.fromDate)}&`;
        if (this.toDate) queryStr += `toDate=${formatQueryDate(this.toDate)}&`;
        if (this.searchTerm) queryStr += `searchTerm=${this.searchTerm}&`;

        queryStr = queryStr.slice(0, queryStr.length - 1);

        return queryStr;
    }

    /**
     * @returns True if either date is populated.
     */
    get doSearchBetweenDates() {
        return !!(this.fromDate || this.toDate);
    }

    /**
     * Return a new SearchParams object based on a query string in the format of `selectedType={selected type}&fromDate={from date}&toDate={to date}&searchTerm={search term}`.
     * If a part of the query string is missing, it will not be populated on the object.
     * @param {string} queryStr The query string to parse.
     * @returns {SearchParams} The built object.
     */
    static parseQueryString(queryStr) {
        const searchParams = new SearchParams();

        const parts = queryStr.trim().split("&");

        for (const part of parts) {
            const [key, value] = part.split("=");

            if (key === "fromDate" || key === "toDate")
                searchParams[key] = new Date(value);
            else if (!value) searchParams.searchTerm = key;
            else searchParams[key] = value;
        }

        return searchParams;
    }
}
