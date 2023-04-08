import React from "react";
import LoginForm from "../../components/forms/LoginForm";

import styles from "./styles.module.scss";

const LoginPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <h2 className={styles.title}>Sign in to React Social</h2>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
