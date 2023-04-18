import React from "react";
import Friend from "./Friend";
import { useFriends } from "../../hooks/useFriends";

import styles from "./styles.module.scss";

const FriendsPage: React.FC = () => {
    const { friends, checkIsOnline } = useFriends();

    return (
        <div>
            <ul className={styles.friendsList}>
                {friends.map((friend) => (
                    <li className={styles.friendItem} key={friend.id}>
                        <Friend friend={friend} isOnline={checkIsOnline(friend.id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsPage;
