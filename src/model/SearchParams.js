import moment from "moment";
import { formatDate } from "../util/timeFormatters";

export default class SearchParams {
    searchTerm = "";
    selectedType = "";
    fromDate = null;
    toDate = null;

    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    get queryString() {
        let queryStr = "";
        if (this.selectedType) queryStr += `selectedType:${this.selectedType}&`;
        if (this.fromDate) queryStr += `fromDate:${formatDate(this.fromDate)}&`;
        if (this.toDate) queryStr += `toDate:${formatDate(this.toDate)}&`;
        if (this.searchTerm) queryStr += `searchTerm:${this.searchTerm}&`;

        queryStr = queryStr.slice(0, queryStr.length - 1);

        return queryStr;
    }

    get doSearchBetweenDates() {
        return !!(this.fromDate || this.toDate);
    }

    /// returns a new SearchParams object based on the queryStr
    static parseQueryString(queryStr) {
        const searchParams = new SearchParams();

        const parts = queryStr.trim().split("&");

        for (const part of parts) {
            const [key, value] = part.split(":");

            if (key === "fromDate" || key === "toDate")
                searchParams[key] = moment(value).toDate();
            else if (!value) searchParams.searchTerm = key;
            else searchParams[key] = value;
        }

        return searchParams;
    }
}
