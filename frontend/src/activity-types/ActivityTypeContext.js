import React, { useContext, useReducer } from "react";
import { useTypeReducer } from "./useTypeReducer.js";

/**
 * Global context for activity type state.
 *
 * @tutorial activity-type-state
 */
const ActivityTypeContext = React.createContext();

/**
 * Global provider for activity type state.
 * @param {object} props
 *
 * @tutorial activity-type-state
 */
const ActivityTypeProvider = ({ children }) => {
    const [state, dispatch] = useTypeReducer();
    return (
        <ActivityTypeContext.Provider value={[state, dispatch]}>
            {children}
        </ActivityTypeContext.Provider>
    );
};

/**
 * Hook for accessing global activity type state.
 *
 * @tutorial activity-type-state
 */
const useActivityTypeContext = () => useContext(ActivityTypeContext);

export { ActivityTypeContext, ActivityTypeProvider, useActivityTypeContext };
