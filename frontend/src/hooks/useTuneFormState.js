import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityModel } from "../activities/ActivityModel.js";
import { ActivityTypeModel } from "../activity-types/ActivityTypeModel.js";
import SearchParams from "../model/SearchParams.js";
import useSearchParams from "./useSearchParams.js";

const useTuneFormState = (queryString) => {
    // The original search params used only to get the original form values
    const originalSearchParams = useSearchParams(queryString);

    // The working version of the search params which updates as the form values update
    const [searchParams, setSearchParams] = useState(originalSearchParams);

    useEffect(() => {
        setSearchParams(originalSearchParams);
    }, [originalSearchParams]);

    const [searchTerm, setSearchTerm] = useState(
        originalSearchParams.searchTerm
    );
    const [selectedType, setSelectedType] = useState(
        originalSearchParams.selectedType
    );
    const [fromDate, setFromDate] = useState(originalSearchParams.fromDate);
    const [toDate, setToDate] = useState(originalSearchParams.toDate);

    const [doSearchBetweenDates, setDoSearchBetweenDates] = useState(
        !!(searchParams.fromDate || searchParams.toDate)
    );

    useEffect(() => {
        const params = new SearchParams(originalSearchParams);
        params.searchTerm = searchTerm;
        params.selectedType = selectedType;
        params.fromDate = fromDate;
        params.toDate = toDate;
        setSearchParams(params);
    }, [searchTerm, selectedType, fromDate, toDate]);

    // TODO: update invalidState when any invalid/missing values
    const [invalidState, setInvalidState] = useState(false);

    return [
        {
            searchParams,
            doSearchBetweenDates,
            invalidState,
        },
        {
            setSearchTerm,
            setSelectedType,
            setDoSearchBetweenDates,
            setFromDate,
            setToDate,
        },
    ];
};

export default useTuneFormState;
