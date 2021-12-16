import { Methods } from "./useTypeReducer.js";
import { useActivityTypeContext } from "./ActivityTypeContext.js";
import { ActivityTypeRepository } from "./ActivityTypeRepository.js";

const repo = new ActivityTypeRepository();

const useTypeRepository = (dependencyArray = []) => {
    const [state, dispatch] = useActivityTypeContext();

    const addSingleType = (type) => {
        if (state.types.contains(type)) {
            dispatch({
                type: Methods.DONE_LOADING_TYPES,
                payload: { types: [...state.types] },
            });
        } else {
            dispatch({
                type: Methods.DONE_LOADING_TYPES,
                payload: { types: [...state.types, type] },
            });
        }
    };

    const removeSingleType = (type) => {
        if (state.types.contains(type)) {
            const index = state.types.indexOf(type);
            dispatch({
                type: Methods.DONE_LOADING_TYPES,
                payload: { types: [...state.types.splice(index, 1)] },
            });
        } else {
            dispatch({
                type: Methods.DONE_LOADING_TYPES,
                payload: { types: [...state.types] },
            });
        }
    };

    const setAllTypes = (types) => {
        dispatch({
            type: Methods.DONE_LOADING_TYPES,
            payload: { types },
        });
    };

    const reloadAll = async () => {
        dispatch({ type: Methods.LOADING_TYPES });
        try {
            const allTypes = await repo.getAll();
            setAllTypes(allTypes);
        } catch (e) {
            dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
        }
    };

    const reloadOne = async (id) => {
        dispatch({ type: Methods.LOADING_TYPES });
        try {
            const type = await repo.getById(id);
            addSingleType(type);
        } catch (e) {
            dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
        }
    };

    const add = async (type) => {
        dispatch({ type: Methods.LOADING_TYPES });
        try {
            const addedType = await repo.add(type);
            addSingleType(addedType);
        } catch (e) {
            dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
        }
    };

    const remove = async (type) => {
        dispatch({ type: Methods.LOADING_TYPES });
        try {
            await repo.remove(type._id);
            removeSingleType(type);
        } catch (e) {
            dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
        }
    };

    return [
        state,
        {
            reloadAll,
            reloadOne,
            add,
            remove,
        },
    ];
};

export { useTypeRepository };

// // TODO: TypeRepository should  be its own type that this hook references
// const useTypeRepository = (dependencyArray = []) => {
//     const [{ typeState }, dispatch] = useMainContext();

//     const loadTypes = async () => {
//         dispatch({ type: Methods.LOADING_TYPES });
//         try {
//             const response = await axios.get(`/types`);
//             if (response.status !== 200) throw new Error(response.error);
//             dispatch({
//                 type: Methods.DONE_LOADING_TYPES,
//                 payload: { types: response.data },
//             });
//         } catch (e) {
//             dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
//         }
//     };

//     const addType = async (typeName) => {
//         dispatch({ type: Methods.LOADING_TYPES });
//         try {
//             const type = { name: typeName };
//             const response = await axios.post(`types/add`, type);
//             if (response.status !== 200) throw new Error(response.error);

//             await loadTypes();
//         } catch (e) {
//             dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
//         }
//     };

//     const removeType = async (typeId) => {
//         dispatch({ type: Methods.LOADING_TYPES });
//         try {
//             const response = await axios.delete(`types/remove/${typeId}`);
//             if (response.status !== 200) throw new Error(response.error);

//             await loadTypes();
//         } catch (e) {
//             dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
//         }
//     };

//     useEffect(() => {
//         loadTypes();
//     }, dependencyArray);

//     return [typeState, { addType, removeType }];
// };

// export default useTypeRepository;
