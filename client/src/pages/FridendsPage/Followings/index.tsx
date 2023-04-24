import React, { useEffect, useState } from "react";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";
import Avatar from "../../../components/Avatar";
import { MESSENGER_ROUTE } from "../../../constants/routesPathnames";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { unfollowUser } from "../../../store/user/thunks/unfollowUser";
import { Socket } from "socket.io-client";
import EmptyList from "../EmptyList";
import Loader from "../../../components/Loader";

import styles from "./styles.module.scss";

type Props = {
    user: IUser;
    socket: Socket | null;
};

const Followings: React.FC<Props> = ({ user, socket }) => {
    const [followingUsers, setFollowingUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const response = await UserService.getFollowings(user.id);
                setFollowingUsers(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollowings();
    }, [user.id]);

    useEffect(() => {
        socket?.on("addFriend", (friend) => {
            setFollowingUsers((prev) => prev.filter((following) => following.id !== friend.id));
        });
        socket?.on("addFollowing", (followingUser: IUser) => {
            setFollowingUsers((prev) => [...prev, followingUser]);
        });
        socket?.on("removeFriend", (friend: IUser) => {
            setFollowingUsers((prev) => [...prev, friend]);
        });
    }, [socket]);

    const handleUnfollow = async (followId: string) => {
        await dispatch(unfollowUser({ userId: user.id, followId }));
        setFollowingUsers((prev) => prev.filter((following) => following.id !== followId));
        socket?.emit("removeRequest", user.id, followId);
    };

    return (
        <>
            {isLoading && <Loader className={styles.loader} />}
            {!isLoading && followingUsers.length < 1 && <EmptyList />}
            {!isLoading && followingUsers.length > 0 && (
                <ul className={styles.followingsList}>
                    {followingUsers.map((followingUser) => (
                        <li className={styles.followingItem} key={followingUser.id}>
                            <div className={styles.wrapper}>
                                <Avatar className={styles.avatar} />
                                <div className={styles.content}>
                                    <Link className={styles.name} to={"/"}>
                                        {followingUser.firstName} {followingUser.lastName}
                                    </Link>
                                    <Link className={styles.messageLink} to={MESSENGER_ROUTE.PATH}>
                                        Write message
                                    </Link>
                                </div>
                            </div>
                            <button className={styles.unfollowButton} onClick={() => handleUnfollow(followingUser.id)}>
                                Unfollow
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Followings;
