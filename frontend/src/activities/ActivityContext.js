import React, { useContext } from "react";
import { useActivityReducer } from "./useActivityReducer.js";

/**
 * Context for global activity state.
 *
 * @tutorial activity-state
 */
const ActivityContext = React.createContext();

/**
 * Global provider of activity state.
 * @param {object} props
 *
 * @tutorial activity-state
 */
const ActivityProvider = ({ children }) => {
    const [state, dispatch] = useActivityReducer();
    return (
        <ActivityContext.Provider value={[state, dispatch]}>
            {children}
        </ActivityContext.Provider>
    );
};

/**
 * Hook for accessing activity state.
 *
 * @tutorial activity-state
 */
const useActivityContext = () => useContext(ActivityContext);

export { ActivityContext, ActivityProvider, useActivityContext };
