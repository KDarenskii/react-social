import React from "react";
import LoginForm, { LoginFormValues } from "../../components/forms/LoginForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginUser } from "../../store/user/thunks/loginUser";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectUserError } from "../../store/user/selectors";
import Alert from "../../components/Alert";
import { ALERT } from "../../constants/alert";

import styles from "./styles.module.scss";
import ActionButton from "../../components/ui/ActionButton";
import { logoutUser } from "../../store/user/thunks/logoutUser";
import { authApi } from "../../api";

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectUserError);

    const handleSubmit = async (values: LoginFormValues) => {
        console.log(values);
        const { email, password } = values;
        dispatch(loginUser({ email, password }));
    };

    const handleLogout = async () => {
        dispatch(logoutUser());
    };

    const fetchData = async () => {
        try {
            const response = await authApi.get("https://jsonplaceholder.typicode.com/users");
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
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
            <ActionButton
                onClick={fetchData}
                colorType="warning"
                style={{ position: "fixed", left: "150px", top: "30px" }}
            >
                Получить
            </ActionButton>
            <div className={styles.body}>
                <h2 className={styles.title}>Sign in to React Social</h2>
                {error && (
                    <Alert className={styles.alert} type={ALERT.ERROR}>
                        {error}
                    </Alert>
                )}
                <LoginForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default LoginPage;
