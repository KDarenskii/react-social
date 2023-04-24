import React, { useEffect, useRef, useState } from "react";
import { BiBell } from "react-icons/bi";
import Avatar from "../../../../Avatar";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import { TiUserAdd } from "react-icons/ti";
import useClickOutside from "../../../../../hooks/useClickOutside";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { selectNotifications } from "../../../../../store/notifications/selectors";
import { selectUser } from "../../../../../store/user/selectors";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { fetchNotifications } from "../../../../../store/notifications/thunks/fetchNotifications";
import { NOTICE } from "../../../../../constants/notice";
import { deleteNotification } from "../../../../../store/notifications/thunks/deleteNotification";
import { deleteAllNotifications } from "../../../../../store/notifications/thunks/deleteAllNotifications";
import { useSocketContext } from "../../../../../context/socketContext";
import { INotification } from "../../../../../models/Notification";
import { addNotification } from "../../../../../store/notifications/notificationsSlice";
import cn from "classnames";

import styles from "./styles.module.scss";

const Notifications: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const noticesRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(noticesRef, () => setIsActive(false));

    const dispatch = useAppDispatch();
    const notifications = useAppSelector(selectNotifications);
    const user = useAppSelector(selectUser);
    const { socket } = useSocketContext();

    useEffect(() => {
        const getNotifications = async () => {
            await dispatch(fetchNotifications(user.id));
        };
        getNotifications();
    }, [user.id, dispatch]);

    useEffect(() => {
        socket?.on("getNotification", (notification: INotification) => {
            dispatch(addNotification(notification));
        });
    }, [socket, dispatch]);

    const handleDeleteNotification = async (id: string) => {
        await dispatch(deleteNotification(id));
    };

    const handleAllDeleteNotification = async () => {
        await dispatch(deleteAllNotifications(user.id));
    };

    return (
        <div className={styles.notices}>
            <button
                className={cn(styles.noticeButton, isActive && styles.active)}
                onClick={() => setIsActive((prev) => !prev)}
            >
                <BiBell className={styles.bellIcon} />
                {notifications.length > 0 && <div className={styles.noticeCounter}>{notifications.length}</div>}
            </button>
            <div className={cn(styles.noticesMenu, isActive && styles.active)} ref={noticesRef}>
                <header className={styles.header}>
                    <h6 className={styles.headerTitle}>Notifications</h6>
                    <button className={styles.markAllButton} onClick={handleAllDeleteNotification}>
                        Mark all as read
                    </button>
                </header>
                <ul className={styles.noticesList}>
                    {notifications.map((notice) => (
                        <li className={styles.noticeItem} key={notice.id}>
                            <div className={styles.photoWrapper}>
                                <Avatar className={styles.avatar} />
                                {notice.type === NOTICE.FRIEND_REQUEST && <TiUserAdd className={styles.noticeIcon} />}
                                {notice.type === NOTICE.FRIEND_ACCEPT && (
                                    <TiUserAdd className={cn(styles.noticeIcon, styles.accept)} />
                                )}
                                {notice.type === NOTICE.LIKE && (
                                    <AiFillHeart className={cn(styles.noticeIcon, styles.like)} />
                                )}
                            </div>
                            <div className={styles.info}>
                                <h5 className={styles.title}>
                                    <span className={styles.name}>
                                        {notice.firstName} {notice.lastName}
                                    </span>{" "}
                                    {notice.type === NOTICE.FRIEND_REQUEST && "wants to be your friend"}
                                    {notice.type === NOTICE.FRIEND_ACCEPT && "accepted your friend request"}
                                    {notice.type === NOTICE.LIKE && "reacted to your post"}
                                </h5>
                                <div className={styles.date}>13 Apr at 15:45</div>
                            </div>
                            <button className={styles.markButton} onClick={() => handleDeleteNotification(notice.id)}>
                                <AiOutlineEye className={styles.markIcon} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notifications;
