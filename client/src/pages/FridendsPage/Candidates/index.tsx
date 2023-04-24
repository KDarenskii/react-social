import React, { useEffect, useMemo, useState } from "react";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectUser } from "../../../store/user/selectors";
import Avatar from "../../../components/Avatar";
import { HiOutlineUserAdd } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { followUser } from "../../../store/user/thunks/followUser";
import { INotificationDto } from "../../../models/Notification";
import { NOTICE } from "../../../constants/notice";
import { useSocketContext } from "../../../context/socketContext";
import Loader from "../../../components/Loader";
import EmptyList from "../EmptyList";

import styles from "./styles.module.scss";

const Candidates: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { socket } = useSocketContext();
    const currentUser = useAppSelector(selectUser);

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const filteredUsers = useMemo(
        () =>
            users.filter(
                ({ id }) =>
                    id !== currentUser.id &&
                    !currentUser?.friends?.includes(id) &&
                    !currentUser?.followings?.includes(id) &&
                    !currentUser?.requests?.includes(id)
            ),
        [users, currentUser.id, currentUser.friends, currentUser.followings, currentUser.requests]
    );

    useEffect(() => {
        setIsLoading(true);

        const fetchUsers = async () => {
            try {
                const response = await UserService.getUsers({ params: { search: searchParams.get("search") } });
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [searchParams]);

    const handleFollow = async (requestFriend: IUser) => {
        const notification: INotificationDto = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            type: NOTICE.FRIEND_REQUEST,
            userId: requestFriend.id,
        };
        try {
            const notificationData = await dispatch(followUser({ userId: currentUser.id, notification })).unwrap();
            socket?.emit("sendNotification", notificationData);
            socket?.emit("sendRequest", currentUser, requestFriend.id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {isLoading && <Loader className={styles.loader} />}
            {!isLoading && users.length < 1 && <EmptyList />}
            {!isLoading && users.length > 0 && (
                <ul className={styles.usersList}>
                    {filteredUsers.map((requestFriend) => (
                        <li className={styles.userItem} key={requestFriend.id}>
                            <Avatar className={styles.avatar} />
                            <div className={styles.wrapper}>
                                <div className={styles.info}>
                                    <Link to={""} className={styles.name}>
                                        {requestFriend.firstName} {requestFriend.lastName}
                                    </Link>
                                    <div className={styles.subtitle}>
                                        {
                                            requestFriend.friends.filter((friend) =>
                                                currentUser.friends.includes(friend)
                                            ).length
                                        }{" "}
                                        mutural friends
                                    </div>
                                </div>
                                <button className={styles.addButton} onClick={() => handleFollow(requestFriend)}>
                                    <HiOutlineUserAdd className={styles.addIcon} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Candidates;
