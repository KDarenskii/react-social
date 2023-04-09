import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.scss";
import Header from "./Header";
import Container from "../../Container";
import NavSidebar from "./NavSidebar";
import InfoSidebar from "./InfoSidebar";

const MainLayout: React.FC = () => {
    return (
        <div className={styles.layout}>
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
