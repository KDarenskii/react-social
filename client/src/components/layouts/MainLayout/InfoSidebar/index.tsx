import React from "react";
import FriendBadge from "../../../FriendBadge";

import styles from "./styles.module.scss";

const InfoSidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.friendsBody}>
                <h5 className={styles.title}>Friends Online</h5>
                <ul className={styles.friendsList}>
                    <li>
                        <FriendBadge />
                    </li>
                    <li>
                        <FriendBadge />
                    </li>
                    <li>
                        <FriendBadge />
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default InfoSidebar;
