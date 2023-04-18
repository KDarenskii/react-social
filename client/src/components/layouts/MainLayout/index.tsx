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

import styles from "./styles.module.scss";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectUser } from "../../../store/user/selectors";

const MainLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector(selectUser);

    const handleLogout = async () => {
        navigate(LOGIN_ROUTE.PATH);
        await dispatch(logoutUser());
    };

    return (
        <div className={styles.layout}>
            <div style={{ position: "fixed", right: "300px", top: "10px", zIndex: 999 }}>{user.email}</div>
            <div style={{ position: "fixed", right: "300px", top: "30px", zIndex: 999 }}>{user.id}</div>
            <ActionButton
                onClick={handleLogout}
                colorType="info"
                style={{ position: "fixed", right: "30px", top: "10px", zIndex: 999 }}
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
