import React, { useEffect, useState } from "react";
import Avatar from "../../../../components/Avatar";
import { IConversation } from "../../../../models/Conversation";
import { IUser } from "../../../../models/User";
import UserService from "../../../../service/UserService";
import { useFriends } from "../../../../hooks/useFriends";

import styles from "./styles.module.scss";

type Props = {
    conversation: IConversation;
    userId: string;
};

const Conversation: React.FC<Props> = ({ conversation, userId }) => {
    const [friend, setFriend] = useState({} as IUser);
    const [isLoading, setIsLoading] = useState(true);
    const { checkIsOnline } = useFriends();

    useEffect(() => {
        setIsLoading(true);

        const fetchFriend = async () => {
            try {
                const friendId = conversation.members.find((member) => member !== userId);
                if (!friendId) return;
                const response = await UserService.getById(friendId);
                setFriend(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFriend();
    }, [conversation.members, userId]);

    return (
        <>
            {!isLoading && (
                <div className={styles.conversation}>
                    <div className={styles.wrapper}>
                        <div className={styles.content}>
                            <Avatar className={styles.conversationImg} isOnline={checkIsOnline(friend.id)} />
                            <div className={styles.title}>
                                <h5 className={styles.name}>
                                    {friend.firstName} {friend.lastName}
                                </h5>
                                <div className={styles.preview}>
                                    <Avatar className={styles.senderAvatar} imageClassName={styles.senderImg} />
                                    <p className={styles.message}>Message and some text</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.time}>13:25</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Conversation;
