import React from "react";
import LoginForm, { LoginFormValues } from "../../components/forms/LoginForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginUser } from "../../store/user/thunks/loginUser";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectUserError } from "../../store/user/selectors";
import Alert from "../../components/Alert";
import { ALERT } from "../../constants/alert";
import { NEWS_ROUTE } from "../../constants/routesPathnames";
import { useFromNavigate } from "../../hooks/useFromNavigate";
import { useSocketConnect } from "../../hooks/useSocketConnect";

import styles from "./styles.module.scss";

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useFromNavigate();
    const connectSocket = useSocketConnect();
    const error = useAppSelector(selectUserError);

    const handleSubmit = async (values: LoginFormValues) => {
        const { email, password } = values;
        try {
            const user = await dispatch(loginUser({ email, password })).unwrap();
            connectSocket(user.id);
            navigate(NEWS_ROUTE.PATH);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.page}>
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
