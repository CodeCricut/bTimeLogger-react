import React, { useContext } from "react";
import { useActivityReducer } from "./useActivityReducer.js";

const ActivityContext = React.createContext();

const ActivityProvider = ({ children }) => {
    const [state, dispatch] = useActivityReducer();
    return (
        <ActivityContext.Provider value={[state, dispatch]}>
            {children}
        </ActivityContext.Provider>
    );
};

const useActivityContext = () => useContext(ActivityContext);

export { ActivityContext, ActivityProvider, useActivityContext };
