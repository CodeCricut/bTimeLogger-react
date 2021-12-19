import {
    DoneLoadingTypesAction,
    LoadTypesAction,
    TypesErrorAction,
} from "./useTypeReducer.js";
import { ActivityTypeRepository } from "./ActivityTypeRepository.js";
import { useTypeReducer } from "./useTypeReducer.js";
import { useEffect } from "react";

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

    const reloadAllTypes = async () => {
        await tryModifyTypeStateAsync(async () => {
            const allTypes = await activityTypeRepository.getAll();
            setAllTypes(allTypes);
        });
    };

    const reloadOneType = async (id) => {
        await tryModifyTypeStateAsync(async () => {
            const type = await activityTypeRepository.getById(id);
            updateSingleType(type);
        });
    };

    const addType = async (type) => {
        await tryModifyTypeStateAsync(async () => {
            const addedType = await activityTypeRepository.add(type);
            addSingleType(addedType);
        });
    };

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
