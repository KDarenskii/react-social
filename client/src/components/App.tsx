import React, { useEffect, useState } from "react";
import Router from "./Router";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { checkAuth } from "../store/user/thunks/checkAuth";
import { useSocketConnect } from "../hooks/useSocketConnect";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const connectSocket = useSocketConnect();

    useEffect(() => {
        const authenticateUser = async () => {
            setIsLoading(true);
            try {
                const user = await dispatch(checkAuth()).unwrap();
                connectSocket(user.id);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (localStorage.getItem("token")) {
            authenticateUser();
        } else {
            setIsLoading(false);
        }
    }, [dispatch, connectSocket]);

    return isLoading ? <p>Загрузка...</p> : <Router />;
};

export default App;
