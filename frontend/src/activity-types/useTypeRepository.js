import {
    DoneLoadingTypesAction,
    LoadTypesAction,
    TypesErrorAction,
    TypeState,
} from "./useTypeReducer.js";
import { ActivityTypeRepository } from "./ActivityTypeRepository.js";
import { useTypeReducer } from "./useTypeReducer.js";
import { useEffect } from "react";

/**
 * Hook for managing local activity type state which syncs with the server. Provides useful abstractions for managing type state, like loading
 * all types or adding new types, and access to the TypeState returned by useTypeReducer.
 * @param {ActivityTypeRepository} activityTypeRepository Optional repository to use for interacting with type state. Mostly used for injecting test mocks.
 * @returns {[TypeState, { reloadAllTypes, reloadOneType, addType, removeType, }]} Array where the first argument is the type state, and the second is an object with methods to interact with the state.
 */
const useTypeRepository = (
    activityTypeRepository = new ActivityTypeRepository()
) => {
    const [state, dispatch] = useTypeReducer();

    const addSingleType = (type) => {
        if (state.types.includes(type)) {
            dispatch(new DoneLoadingTypesAction([...state.types]));
        } else {
            dispatch(new DoneLoadingTypesAction([...state.types, type]));
        }
    };

    const updateSingleType = (type) => {
        const index = state.types.findIndex((t) => t._id == type._id);
        const updatedTypes = [...state.types];
        if (index === -1) {
            updatedTypes.push(type);
        } else {
            updatedTypes[index] = type;
        }
        dispatch(new DoneLoadingTypesAction(updatedTypes));
    };

    const removeSingleType = (type) => {
        if (state.types.includes(type)) {
            const index = state.types.indexOf(type);
            const newArr = [...state.types];
            newArr.splice(index, 1);
            dispatch(new DoneLoadingTypesAction(newArr));
        } else {
            throw new Error(
                "Tried to remove type from type state which didn't exist."
            );
        }
    };

    const setAllTypes = (types) => {
        dispatch(new DoneLoadingTypesAction([...types]));
    };

    const tryModifyTypeStateAsync = async (action) => {
        dispatch(new LoadTypesAction());
        try {
            await action();
        } catch (e) {
            dispatch(new TypesErrorAction(e));
        }
    };

    /**
     * Reload, or refresh, all activity types that are present in state. If a type exists in the
     * server state but not local state, it will be added to local state.
     */
    const reloadAllTypes = async () => {
        await tryModifyTypeStateAsync(async () => {
            const allTypes = await activityTypeRepository.getAll();
            setAllTypes(allTypes);
        });
    };

    /**
     * Reload, or refresh, an activity type that is already in the state. If the type exists
     * in the server state but not local state, it will be added to local state.
     * @param {string} id The id of the activity type to reload
     */
    const reloadOneType = async (id) => {
        await tryModifyTypeStateAsync(async () => {
            const type = await activityTypeRepository.getById(id);
            updateSingleType(type);
        });
    };

    /**
     * Add a type to the state
     * @param {ActivityTypeModel} type
     * @returns {Promise}
     */
    const addType = async (type) => {
        await tryModifyTypeStateAsync(async () => {
            const addedType = await activityTypeRepository.add(type);
            addSingleType(addedType);
        });
    };

    /**
     * Remove a type from the state
     * @param {ActivityTypeModel} type
     * @returns {Promise}
     */
    const removeType = async (type) => {
        await tryModifyTypeStateAsync(async () => {
            await activityTypeRepository.remove(type._id);
            removeSingleType(type);
        });
    };

    useEffect(() => {
        reloadAllTypes();
    }, []);

    return [
        state,
        {
            reloadAllTypes,
            reloadOneType,
            addType,
            removeType,
        },
    ];
};

export { useTypeRepository };
