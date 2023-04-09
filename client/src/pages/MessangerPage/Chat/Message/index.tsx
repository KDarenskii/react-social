import React from "react";

import styles from "./styles.module.scss";
import Avatar from "../../../../components/Avatar";

const Message: React.FC = () => {
    return (
        <div className={styles.message}>
            <div className={styles.wrapper}>
                <Avatar className={styles.avatar} />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <span className={styles.name}>Vasya Petrov</span>
                        <span className={styles.time}>13:30</span>
                    </div>
                    <div className={styles.text}>Добрый день</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
