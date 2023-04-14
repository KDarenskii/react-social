import React from "react";
import RegistrationForm, { RegistrationFormValues } from "../../components/forms/RegistrationForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser } from "../../store/user/thunks/registerUser";
import ActionButton from "../../components/ui/ActionButton";
import { logoutUser } from "../../store/user/thunks/logoutUser";

import styles from "./styles.module.scss";

const RegistrationPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: RegistrationFormValues) => {
        console.log(values);

        const { firstName, lastName, email, password } = values;

        try {
            dispatch(registerUser({ firstName, lastName, email, password }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        dispatch(logoutUser());
    };

    return (
        <div className={styles.page}>
            <ActionButton
                onClick={handleLogout}
                colorType="info"
                style={{ position: "fixed", left: "30px", top: "30px" }}
            >
                Выйти
            </ActionButton>
            <div className={styles.body}>
                <h2 className={styles.title}>Sign up to React Social</h2>
                <RegistrationForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default RegistrationPage;
