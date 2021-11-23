import React, { useContext, useReducer } from "react";
import mainReducer from "./main-reducer";
import { initialState as typeState } from "../activity-types/type-reducer";
import { initialState as activityState } from "../activities/activity-reducer";

const MainContext = React.createContext();

// We have ONE provider/context for all state/reducers, BUT we only need one main reducer
// useReducer(mainReducer) will return [{activities, types}, dispatch]
// notice that it returns an object with all state types, but only one dispatch function
const MainProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, {
        activityState,
        typeState,
    });
    return (
        <MainContext.Provider value={[state, dispatch]}>
            {children}
        </MainContext.Provider>
    );
};

const useMainContext = () => {
    return useContext(MainContext);
};
// use case: [{activities, types}, dispatch] = useMainContext();

export default MainContext;
export { MainProvider, useMainContext };
