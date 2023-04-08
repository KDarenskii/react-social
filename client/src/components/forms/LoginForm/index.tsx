import React from "react";
import Input from "../../ui/Input";
import ActionButton from "../../ui/ActionButton";
import { NEWS_ROUTE, REGISTRATION_ROUTE } from "../../../constants/routesPathnames";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    return (
        <form>
            <label className={styles.label}>
                <Input className={styles.input} placeholder="Nickname" />
            </label>
            <label className={styles.label}>
                <Input className={styles.input} placeholder="Password" type="password" />
            </label>
            <ActionButton
                className={styles.submitBtn}
                onClick={() => navigate(NEWS_ROUTE.PATH)}
                colorType="info"
                type="submit"
            >
                Sign in
            </ActionButton>
            <p className={styles.message}>or if you don't have an accout</p>
            <ActionButton
                className={styles.submitBtn}
                onClick={() => navigate(REGISTRATION_ROUTE.PATH)}
                colorType="success"
            >
                Sign up
            </ActionButton>
        </form>
    );
};

export default LoginForm;
