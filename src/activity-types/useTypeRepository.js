import { useEffect } from "react";
import { Methods } from "./type-reducer.js";
import axios from "axios";
import { useMainContext } from "../data/MainContext.js";

const useTypeRepository = (dependencyArray = []) => {
    const [{ typeState }, dispatch] = useMainContext();

    const loadTypes = async () => {
        dispatch({ type: Methods.LOADING_TYPES });
        try {
            const response = await axios.get(`/types`);
            if (response.status !== 200) throw new Error(response.error);
            dispatch({
                type: Methods.DONE_LOADING_TYPES,
                payload: { types: response.data },
            });
        } catch (e) {
            dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
        }
    };

    const addType = async (typeName) => {
        dispatch({ type: Methods.LOADING_TYPES });
        try {
            const type = { name: typeName };
            const response = await axios.post(`types/add`, type);
            if (response.status !== 200) throw new Error(response.error);

            await loadTypes();
        } catch (e) {
            dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
        }
    };

    const removeType = async (typeId) => {
        dispatch({ type: Methods.LOADING_TYPES });
        try {
            const response = await axios.delete(`types/remove/${typeId}`);
            if (response.status !== 200) throw new Error(response.error);

            await loadTypes();
        } catch (e) {
            dispatch({ type: Methods.TYPES_ERROR, payload: { error: e } });
        }
    };

    useEffect(() => {
        loadTypes();
    }, dependencyArray);

    return [typeState, { addType, removeType }];
};

export default useTypeRepository;
