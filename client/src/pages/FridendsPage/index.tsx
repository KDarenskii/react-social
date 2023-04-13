import React from "react";

import styles from "./styles.module.scss";
import Friend from "./Friend/Index";

const FriendsPage: React.FC = () => {
    return (
        <div>
            <ul className={styles.friendsList}>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
                <li className={styles.friendItem}>
                    <Friend />
                </li>
            </ul>
        </div>
    );
};

export default FriendsPage;
