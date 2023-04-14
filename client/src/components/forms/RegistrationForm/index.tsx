import React from "react";
import Input from "../../ui/Input";
import ActionButton from "../../ui/ActionButton";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../constants/routesPathnames";
import { Formik } from "formik";

import styles from "./styles.module.scss";

type Props = {
    onSubmit: (values: RegistrationFormValues) => Promise<void>;
};

export interface RegistrationFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegistrationForm: React.FC<Props> = ({ onSubmit }) => {
    const navigate = useNavigate();

    const initialState: RegistrationFormValues = {
        firstName: "Kirich",
        lastName: "Legenda",
        email: "kirich@mail.com",
        password: "123123",
        confirmPassword: "123123",
    };

    return (
        <Formik initialValues={initialState} onSubmit={onSubmit}>
            {({ handleSubmit, handleBlur, handleChange, values }) => (
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        <Input
                            className={styles.input}
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="First name"
                        />
                    </label>
                    <label className={styles.label}>
                        <Input
                            className={styles.input}
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Last name"
                        />
                    </label>
                    <label className={styles.label}>
                        <Input
                            className={styles.input}
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Email"
                        />
                    </label>
                    <label className={styles.label}>
                        <Input
                            className={styles.input}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Password"
                            type="password"
                        />
                    </label>
                    <label className={styles.label}>
                        <Input
                            className={styles.input}
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Confirm password"
                            type="password"
                        />
                    </label>
                    <ActionButton
                        className={styles.submitBtn}
                        colorType="info"
                        type="submit"
                    >
                        Sign up
                    </ActionButton>
                    <p className={styles.message}>or if you already have an accout</p>
                    <ActionButton
                        className={styles.submitBtn}
                        onClick={() => navigate(LOGIN_ROUTE.PATH)}
                        colorType="success"
                        type="button"
                    >
                        Sign in
                    </ActionButton>
                </form>
            )}
        </Formik>
    );
};

export default RegistrationForm;
