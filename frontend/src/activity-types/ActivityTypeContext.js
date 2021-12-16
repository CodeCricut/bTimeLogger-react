import React, { useContext, useReducer } from "react";
import { useTypeReducer } from "./useTypeReducer.js";
const ActivityTypeContext = React.createContext();

const ActivityTypeProvider = ({ children }) => {
    const [state, dispatch] = useTypeReducer();
    return (
        <ActivityTypeContext.Provider value={[state, dispatch]}>
            {children}
        </ActivityTypeContext.Provider>
    );
};

const useActivityTypeContext = () => useContext(ActivityTypeContext);

export { ActivityTypeContext, ActivityTypeProvider, useActivityTypeContext };
