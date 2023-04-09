import React from "react";

import styles from "./styles.module.scss";
import Avatar from "../../../../components/Avatar";

const Dialog: React.FC = () => {
    return (
        <div className={styles.dialog}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <Avatar className={styles.dialogImg} isOnline={true} />
                    <div className={styles.title}>
                        <h5 className={styles.name}>Alex Vacovsky</h5>
                        <div className={styles.preview}>
                            <Avatar className={styles.senderAvatar} imageClassName={styles.senderImg} />
                            <p className={styles.message}>Message and some text</p>
                        </div>
                    </div>
                </div>
                <div className={styles.time}>13:25</div>
            </div>
        </div>
    );
};

export default Dialog;
