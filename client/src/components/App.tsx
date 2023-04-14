import React, { useEffect } from "react";
import Router from "./Router";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { checkAuth } from "../store/user/thunks/checkAuth";

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(checkAuth());
        }
    }, [dispatch]);

    return <Router />;
};

export default App;
