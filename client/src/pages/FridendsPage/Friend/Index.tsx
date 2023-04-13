import React from "react";

import styles from "./styles.module.scss";
import Avatar from "../../../components/Avatar";
import ActionButton from "../../../components/ui/ActionButton";
import { Link } from "react-router-dom";
import { MESSENGER_ROUTE } from "../../../constants/routesPathnames";
import { TbUserOff } from "react-icons/tb";

const Friend: React.FC = () => {
    return (
        <div className={styles.friend}>
            <div className={styles.wrapper}>
                <Avatar className={styles.avatar} />
                <div className={styles.content}>
                    <Link className={styles.name} to={"/"}>
                        Ivan Fanilov
                    </Link>
                    <Link className={styles.messageLink} to={MESSENGER_ROUTE.PATH}>
                        Write message
                    </Link>
                </div>
            </div>
            <button className={styles.unfollowButton}>
                <TbUserOff className={styles.unfollowIcon} />
            </button>
        </div>
    );
};

export default Friend;
