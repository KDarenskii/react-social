import React from "react";
import RegistrationForm from "../../components/forms/RegistrationForm";

import styles from "./styles.module.scss";

const RegistrationPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <h2 className={styles.title}>Sign up to React Social</h2>
                <RegistrationForm />
            </div>
        </div>
    );
};

export default RegistrationPage;
