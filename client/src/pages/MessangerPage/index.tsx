import React, { useState } from "react";
import Dialogs from "./Dialogs";

import styles from "./styles.module.scss";
import Chat from "./Chat";

const MessangerPage: React.FC = () => {
    const [isActive, setIsActive] = useState(true);

    return (
        <div className={styles.messenger}>
            {isActive ? (
                <Chat closeDialog={() => setIsActive(false)} />
            ) : (
                <Dialogs setDialog={() => setIsActive(true)} />
            )}
        </div>
    );
};

export default MessangerPage;
