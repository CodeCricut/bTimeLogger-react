import SearchParams from "../../model/SearchParams";
import { startTime, endTime } from "./dates.js";

const searchParams = new SearchParams();
searchParams.searchTerm = "SEARCH TERM";
searchParams.selectedType = "SELECTED TYPE";
searchParams.fromDate = new Date(startTime);
searchParams.toDate = new Date(endTime);

export { searchParams };
