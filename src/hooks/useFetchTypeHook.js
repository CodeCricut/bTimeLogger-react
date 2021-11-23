import React, { useEffect, useState } from "react";

const useFetchTypeHook = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const refresh = async () => await fetchTypes();

    const fetchTypes = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${url}`);
            const data = await response.json();
            setData(data);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTypes();
    });

    return [data, isLoading, error, refresh];
};

export default useFetchTypeHook;
