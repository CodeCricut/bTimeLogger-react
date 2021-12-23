import { useEffect, useMemo, useState } from "react";
import SearchParams from "../model/SearchParams.js";

/**
 * @param {string} queryString The query string to create the search params from
 * @returns {SearchParams}
 */
const useSearchParams = (queryString) => {
    const searchParams = useMemo(
        () => SearchParams.parseQueryString(queryString),
        [queryString]
    );
    return searchParams;
};

export default useSearchParams;
