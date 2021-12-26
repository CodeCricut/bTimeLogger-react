import { ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useState, useCallback } from "react";

const ModalContext = createContext();

/**
 * Global modal provider.
 */
const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(null);
    const unsetModal = useCallback(() => {
        setModal();
    }, [setModal]);

    return (
        <ModalContext.Provider value={[setModal, unsetModal]}>
            {children}
            {modal}
        </ModalContext.Provider>
    );
};

/**
 * @returns {[setModal: function, unsetModal: function]}
 */
const useModalContext = () => {
    return useContext(ModalContext);
};

export default ModalContext;
export { ModalProvider, useModalContext };
