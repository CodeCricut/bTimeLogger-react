import activityReducer from "../activities/activity-reducer";
import typeReducer from "../activity-types/type-reducer";

/* 
    this reducer combines all of our reducers into one so we can use one context/provider
    args: (allState, action)
    returns an object with all reducers {activities, types}
 */

const mainReducer = ({ activityState, typeState }, action) => {
    return {
        activityState: activityReducer(activityState, action),
        typeState: typeReducer(typeState, action),
    };
};

export default mainReducer;
