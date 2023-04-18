import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/ui/Input";
import { BsTriangleFill } from "react-icons/bs";
import Message from "./Message";
import { IConversation } from "../../../models/Conversation";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";
import MessageService from "../../../service/MessageService";
import { IMessage, IMessageDto } from "../../../models/Message";
import { useSocketContext } from "../../../context/socketContext";
import { useFriends } from "../../../hooks/useFriends";

import styles from "./styles.module.scss";

type Props = {
    conversation: IConversation;
    closeDialog: () => void;
    user: IUser;
};

const Chat: React.FC<Props> = ({ conversation, closeDialog, user }) => {
    const [friend, setFriend] = useState({} as IUser);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState("");
    const messageRef = useRef<HTMLLIElement | null>(null);
    const { socket } = useSocketContext();
    const { checkIsOnline } = useFriends();

    useEffect(() => {
        setIsLoading(true);

        const fetchFriendAndMessages = async () => {
            try {
                const friendId = conversation.members.find((member) => member !== user.id);
                if (!friendId) return;
                const friendPromise = UserService.getById(friendId);
                const messagesPromise = MessageService.getByConversationId(conversation.id);
                const [friendResponse, messagesResponse] = await Promise.all([friendPromise, messagesPromise]);
                setFriend(friendResponse.data);
                setMessages(messagesResponse.data);
                messageRef?.current?.scrollIntoView();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFriendAndMessages();
    }, [conversation.members, conversation.id, user.id]);

    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!text) return;

        const messageDto: IMessageDto = {
            conversationId: conversation.id,
            senderId: user.id,
            receiverId: friend.id,
            text,
        };

        try {
            const response = await MessageService.post(messageDto);
            setMessages((messages) => [...messages, response.data]);
            socket?.emit("sendMessage", response.data);
            setText("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        socket?.on("getMessage", (message: IMessage) => {
            const { receiverId, senderId } = message;
            const isMember = conversation.members.every((member) => [receiverId, senderId].includes(member));
            if (isMember && message.senderId !== user.id) {
                setMessages((messages) => [...messages, message]);
            }
        });
    }, [socket, conversation.members, user.id]);

    return (
        <>
            {isLoading && <p>Загрузка...</p>}
            {!isLoading && (
                <div className={styles.chat}>
                    <header className={styles.header}>
                        <div className={styles.headerWrapper}>
                            <div className={styles.backButton} onClick={closeDialog}>
                                <FaChevronLeft className={styles.backIcon} />
                                <span className={styles.backText}>Back</span>
                            </div>
                            <div className={styles.title}>
                                <Link to="/" className={styles.name}>
                                    {friend.firstName} {friend.lastName}
                                </Link>
                                <div className={styles.status}>{checkIsOnline(friend.id) ? "Online" : "Offline"}</div>
                            </div>
                            <Avatar className={styles.avatar} />
                        </div>
                    </header>
                    <ul className={styles.messagesList}>
                        {messages.map((message) => (
                            <li className={styles.messageItem} key={message.id} ref={messageRef}>
                                <Message
                                    message={message}
                                    author={message.senderId === user.id ? user : friend}
                                    isOwner={message.senderId === user.id}
                                />
                            </li>
                        ))}
                    </ul>
                    <footer className={styles.footer}>
                        <div className={styles.footerWrapper}>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <Input
                                    className={styles.input}
                                    value={text}
                                    onChange={(event) => setText(event.target.value)}
                                    placeholder="Write a message..."
                                />
                                <button type="submit">
                                    <BsTriangleFill className={styles.sendIcon} />
                                </button>
                            </form>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Chat;
