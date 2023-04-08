import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.scss";

const MainLayout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <Outlet />
        </div>
    );
};

export default MainLayout;
