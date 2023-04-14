import React from "react";
import Input from "../../ui/Input";
import ActionButton from "../../ui/ActionButton";
import { REGISTRATION_ROUTE } from "../../../constants/routesPathnames";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import styles from "./styles.module.scss";

type Props = {
    onSubmit: (values: LoginFormValues) => Promise<void>;
};

export interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
    const navigate = useNavigate();

    const initialState: LoginFormValues = {
        email: "",
        password: "",
    };

    return (
        <Formik onSubmit={onSubmit} initialValues={initialState}>
            {({ handleBlur, handleChange, handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        <Input
                            className={styles.input}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            placeholder="Email"
                        />
                    </label>
                    <label className={styles.label}>
                        <Input
                            className={styles.input}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            placeholder="Password"
                            type="password"
                        />
                    </label>
                    <ActionButton
                        className={styles.submitBtn}
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
                        type="button"
                    >
                        Sign up
                    </ActionButton>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;
