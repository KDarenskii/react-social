import React from "react";
import DialogSearch from "./DialogSearch";
import Dialog from "./Dialog";

import styles from "./styles.module.scss";

type Props = {
    setDialog: () => void;
};

const Dialogs: React.FC<Props> = ({ setDialog }) => {
    return (
        <div className={styles.dialogs}>
            <header className={styles.header}>
                <div className={styles.searchWrapper}>
                    <DialogSearch />
                </div>
            </header>
            <ul className={styles.dialogsList}>
                <li onClick={setDialog}>
                    <Dialog />
                </li>
                <li onClick={setDialog}>
                    <Dialog />
                </li>
                <li onClick={setDialog}>
                    <Dialog />
                </li>
            </ul>
        </div>
    );
};

export default Dialogs;
