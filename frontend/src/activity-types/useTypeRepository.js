import {
    DoneLoadingTypesAction,
    LoadTypesAction,
    TypesErrorAction,
} from "./useTypeReducer.js";
import { ActivityTypeRepository } from "./ActivityTypeRepository.js";
import { useTypeReducer } from "./useTypeReducer.js";
import { useEffect } from "react";

export const repo = new ActivityTypeRepository();

const useTypeRepository = () => {
    const [state, dispatch] = useTypeReducer();

    const addSingleType = (type) => {
        if (state.types.includes(type)) {
            dispatch(new DoneLoadingTypesAction([...state.types]));
        } else {
            dispatch(new DoneLoadingTypesAction([...state.types, type]));
        }
    };

    const removeSingleType = (type) => {
        if (state.types.includes(type)) {
            const index = state.types.indexOf(type);
            const newArr = [...state.types];
            newArr.splice(index, 1);
            dispatch(new DoneLoadingTypesAction(newArr));
        } else {
            dispatch(new DoneLoadingTypesAction([...state.types]));
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
            const allTypes = await repo.getAll();
            setAllTypes(allTypes);
        });
    };

    const reloadOneType = async (id) => {
        await tryModifyTypeStateAsync(async () => {
            const type = await repo.getById(id);
            addSingleType(type);
        });
    };

    const addType = async (type) => {
        await tryModifyTypeStateAsync(async () => {
            const addedType = await repo.add(type);
            addSingleType(addedType);
        });
    };

    const removeType = async (type) => {
        await tryModifyTypeStateAsync(async () => {
            await repo.remove(type._id);
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
