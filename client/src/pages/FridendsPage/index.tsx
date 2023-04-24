import React, { useEffect, useState } from "react";
import ActionButton from "../../components/ui/ActionButton";
import cn from "classnames";
import { selectUser } from "../../store/user/selectors";
import { useAppSelector } from "../../hooks/useAppSelector";
import MyFriends from "./MyFriends";
import Candidates from "./Candidates";
import CandidatesSearch from "./CandidatesSearch";
import Followings from "./Followings";
import Requests from "./Requests";
import { useSocketContext } from "../../context/socketContext";
import { IUser } from "../../models/User";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
    addFollowing,
    addFriend,
    addRequest,
    removeFollowing,
    removeFriend,
    removeRequest,
} from "../../store/user/userSlice";

import styles from "./styles.module.scss";

const FriendsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const { socket } = useSocketContext();

    const [isSearching, setIsSearching] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        socket?.on("addRequest", (requestUser: IUser) => {
            dispatch(addRequest(requestUser.id));
        });
        socket?.on("addFriend", (friend: IUser) => {
            dispatch(addFriend(friend.id));
            dispatch(removeFollowing(friend.id));
        });
        socket?.on("removeRequest", (requestId) => {
            dispatch(removeRequest(requestId));
        });
        socket?.on("removeFriend", (friend: IUser) => {
            dispatch(removeFriend(friend.id));
            dispatch(addFollowing(friend.id));
        });
    }, [socket, dispatch]);

    return (
        <div className={styles.body}>
            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    {isSearching ? (
                        "Find friends"
                    ) : (
                        <div className={styles.tabs}>
                            <button
                                className={cn(styles.tabButton, activeTab === 0 && styles.active)}
                                onClick={() => setActiveTab(0)}
                            >
                                Friends: {user.friends.length}
                            </button>
                            <button
                                className={cn(styles.tabButton, activeTab === 1 && styles.active)}
                                onClick={() => setActiveTab(1)}
                            >
                                Followings: {user.followings.length}
                            </button>
                            <button
                                className={cn(styles.tabButton, activeTab === 2 && styles.active)}
                                onClick={() => setActiveTab(2)}
                            >
                                Requests: {user.requests.length}
                            </button>
                        </div>
                    )}
                    <ActionButton
                        className={styles.findButton}
                        colorType="success"
                        onClick={() => setIsSearching((prev) => !prev)}
                    >
                        {isSearching ? "My friends" : "Find friends"}
                    </ActionButton>
                </div>
                {isSearching && <CandidatesSearch />}
            </header>
            {isSearching ? (
                <Candidates />
            ) : (
                <>
                    {activeTab === 0 && <MyFriends user={user} socket={socket} />}
                    {activeTab === 1 && <Followings user={user} socket={socket} />}
                    {activeTab === 2 && <Requests user={user} socket={socket} />}
                </>
            )}
        </div>
    );
};

export default FriendsPage;
