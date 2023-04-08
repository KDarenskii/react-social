import React from "react";
import Input from "../../ui/Input";
import ActionButton from "../../ui/ActionButton";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, NEWS_ROUTE } from "../../../constants/routesPathnames";

import styles from "./styles.module.scss";

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();

    return (
        <form>
            <label className={styles.label}>
                <Input className={styles.input} placeholder="Nickname" />
            </label>
            <label className={styles.label}>
                <Input className={styles.input} placeholder="Password" type="password" />
            </label>
            <label className={styles.label}>
                <Input className={styles.input} placeholder="Confirm password" type="password" />
            </label>
            <ActionButton
                className={styles.submitBtn}
                onClick={() => navigate(NEWS_ROUTE.PATH)}
                colorType="info"
                type="submit"
            >
                Sign up
            </ActionButton>
            <p className={styles.message}>or if you already have an accout</p>
            <ActionButton className={styles.submitBtn} onClick={() => navigate(LOGIN_ROUTE.PATH)} colorType="success">
                Sign in
            </ActionButton>
        </form>
    );
};

export default RegistrationForm;
