import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import Avatar from "../Avatar";

import styles from "./styles.module.scss";

const FriendBadge: React.FC = () => {
    return (
        <div className={styles.badge}>
            <div className={styles.wrapper}>
                <Avatar isOnline={true} />
                <span className={styles.name}>Alex Vacovsky</span>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.action}>
                    <AiOutlineMessage className={styles.actionIcon} />
                </div>
                <div className={styles.action}>
                    <BiUserCircle className={styles.actionIcon} />
                </div>
            </div>
        </div>
    );
};

export default FriendBadge;
