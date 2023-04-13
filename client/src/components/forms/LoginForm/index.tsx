import React, { useState } from "react";
import Input from "../../ui/Input";
import ActionButton from "../../ui/ActionButton";
import { NEWS_ROUTE, REGISTRATION_ROUTE } from "../../../constants/routesPathnames";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("Alex")
    const [lastName, setLastName] = useState("Vesnov")
    const [email, setEmail] = useState("alex@mail.com")
    const [password, setPassword] = useState("12345")

    return (
        <form>
            <label className={styles.label}>
                <Input className={styles.input} placeholder="First name" />
            </label>
            <label className={styles.label}>
                <Input className={styles.input} placeholder="Last name" />
            </label>
            <label className={styles.label}>
                <Input className={styles.input} placeholder="Email" />
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
