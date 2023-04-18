import React from "react";
import Avatar from "../../../../components/Avatar";
import { IMessage } from "../../../../models/Message";
import { IUser } from "../../../../models/User";
import { parseISO } from "../../../../helpers/parseISO";

import styles from "./styles.module.scss";

type Props = {
    message: IMessage;
    author: IUser;
    isOwner: boolean;
};

const Message: React.FC<Props> = ({ message, author, isOwner }) => {
    const { time } = parseISO(message.time);

    return (
        <div className={styles.message}>
            <div className={styles.wrapper}>
                <Avatar className={styles.avatar} />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <span className={styles.name}>
                            {isOwner ? "You" : `${author.firstName} ${author.lastName}`}
                        </span>
                        <span className={styles.time}>{time}</span>
                    </div>
                    <div className={styles.text}>{message.text}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
