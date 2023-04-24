import React from "react";
import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";
import { MESSENGER_ROUTE } from "../../../constants/routesPathnames";
import { TbUserOff } from "react-icons/tb";
import { useFriends } from "../../../hooks/useFriends";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { deleteFriend } from "../../../store/user/thunks/deleteFriend";
import { IUser } from "../../../models/User";
import { Socket } from "socket.io-client";
import EmptyList from "../EmptyList";
import Loader from "../../../components/Loader";

import styles from "./styles.module.scss";

type Props = {
    user: IUser;
    socket: Socket | null;
};

const MyFriends: React.FC<Props> = ({ user, socket }) => {
    const { friends, checkIsOnline, isLoading } = useFriends();
    const dispatch = useAppDispatch();

    const handleDeleteFriend = async (friendId: string) => {
        await dispatch(deleteFriend({ userId: user.id, friendId }));
        socket?.emit("removeFriend", user, friendId);
    };

    return (
        <>
            {isLoading && <Loader className={styles.loader} />}
            {!isLoading && friends.length < 1 && <EmptyList />}
            {!isLoading && friends.length > 0 && (
                <ul className={styles.friendsList}>
                    {friends.map((friend) => (
                        <li className={styles.friendItem} key={friend.id}>
                            <div className={styles.friend}>
                                <div className={styles.wrapper}>
                                    <Avatar
                                        className={styles.avatar}
                                        iconClassName={styles.onlineIcon}
                                        isOnline={checkIsOnline(friend.id)}
                                    />
                                    <div className={styles.content}>
                                        <Link className={styles.name} to={"/"}>
                                            {friend.firstName} {friend.lastName}
                                        </Link>
                                        <Link className={styles.messageLink} to={MESSENGER_ROUTE.PATH}>
                                            Write message
                                        </Link>
                                    </div>
                                </div>
                                <button className={styles.unfollowButton} onClick={() => handleDeleteFriend(friend.id)}>
                                    <TbUserOff className={styles.unfollowIcon} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default MyFriends;
