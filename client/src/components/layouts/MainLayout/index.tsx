import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Container from "../../Container";
import NavSidebar from "./NavSidebar";
import InfoSidebar from "./InfoSidebar";

import ActionButton from "../../ui/ActionButton";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { logoutUser } from "../../../store/user/thunks/logoutUser";
import { LOGIN_ROUTE } from "../../../constants/routesPathnames";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectUser } from "../../../store/user/selectors";
import { useSocketContext } from "../../../context/socketContext";

import styles from "./styles.module.scss";


const MainLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector(selectUser);
    const { socket } = useSocketContext();

    const handleLogout = async () => {
        navigate(LOGIN_ROUTE.PATH);
        await dispatch(logoutUser());
        socket?.disconnect();
    };

    return (
        <div className={styles.layout}>
            <div style={{ position: "fixed", right: "50%", top: "10px", zIndex: 999 }}>{user.email}</div>
            <div style={{ position: "fixed", right: "50%", top: "30px", zIndex: 999 }}>{user.id}</div>
            <ActionButton
                onClick={handleLogout}
                colorType="info"
                style={{ position: "fixed", right: "40%", top: "10px", zIndex: 999 }}
            >
                Выйти
            </ActionButton>
            <Header />
            <Container>
                <div className={styles.wrapper}>
                    <NavSidebar />
                    <main className={styles.content}>
                        <Outlet />
                    </main>
                    <InfoSidebar />
                </div>
            </Container>
        </div>
    );
};

export default MainLayout;
