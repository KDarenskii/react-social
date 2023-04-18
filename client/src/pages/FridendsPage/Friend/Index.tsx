import React from "react";
import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";
import { MESSENGER_ROUTE } from "../../../constants/routesPathnames";
import { TbUserOff } from "react-icons/tb";
import { IUser } from "../../../models/User";

import styles from "./styles.module.scss";

type Props = {
    friend: IUser;
    isOnline?: boolean;
};

const Friend: React.FC<Props> = ({ friend, isOnline }) => {
    return (
        <div className={styles.friend}>
            <div className={styles.wrapper}>
                <Avatar className={styles.avatar} iconClassName={styles.onlineIcon} isOnline={isOnline} />
                <div className={styles.content}>
                    <Link className={styles.name} to={"/"}>
                        {friend.firstName} {friend.lastName}
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
