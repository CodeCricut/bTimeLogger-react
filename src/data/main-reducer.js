import React, { useReducer } from "react";

import activityReducer from "./activity-reducer";
import typeReducer from "./type-reducer";

/* 
    this reducer combines all of our reducers into one so we can use one context/provider
    args: (allState, action)
    returns an object with all reducers {activities, types}
 */

const mainReducer = ({ activities, types }, action) => {
    return {
        activities: activityReducer(activities, action),
        types: typeReducer(types, action),
    };
};

export default mainReducer;
