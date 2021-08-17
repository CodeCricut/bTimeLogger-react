import React, { useEffect, useState } from "react";

const useDate = (timeout) => {
    const [date, setDate] = useState(new Date());

    const updateDate = () => setDate(new Date());

    useEffect(() => {
        const timer = setInterval(updateDate, timeout);
        return () => clearInterval(timer);
    });

    return date;
};

export default useDate;
