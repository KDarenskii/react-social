import React from "react";
import RegistrationForm, { RegistrationFormValues } from "../../components/forms/RegistrationForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser } from "../../store/user/thunks/registerUser";
import { useNavigate } from "react-router-dom";
import { useSocketConnect } from "../../hooks/useSocketConnect";
import { NEWS_ROUTE } from "../../constants/routesPathnames";

import styles from "./styles.module.scss";

const RegistrationPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const connectSocket = useSocketConnect();

    const handleSubmit = async (values: RegistrationFormValues) => {
        const { firstName, lastName, email, password } = values;
        const user = await dispatch(registerUser({ firstName, lastName, email, password })).unwrap();
        connectSocket(user.id);
        navigate(NEWS_ROUTE.PATH);
    };

    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <h2 className={styles.title}>Sign up to React Social</h2>
                <RegistrationForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default RegistrationPage;
