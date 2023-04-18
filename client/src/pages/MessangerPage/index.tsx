import React, { useEffect, useState } from "react";
import Conversations from "./Conversations";
import Chat from "./Chat";
import { IConversation } from "../../models/Conversation";
import ConversationService from "../../service/CoversationService";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectUser } from "../../store/user/selectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutUser } from "../../store/user/thunks/logoutUser";

import styles from "./styles.module.scss";

const MessangerPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const [currentConversation, setCurrentConversation] = useState<IConversation | null>(null);
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const fetchConversations = async () => {
            try {
                const response = await ConversationService.getByUserId(user.id);
                setConversations(response.data);
            } catch (error) {
                const err = error as any;
                if (err.response.status === 401) {
                    await dispatch(logoutUser());
                }
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchConversations();
    }, [user.id, dispatch]);

    return (
        <div className={styles.messenger}>
            {error && <p>{error}</p>}
            {isLoading && "Loading..."}
            {!error && !isLoading && !!user.email && (
                <>
                    {currentConversation ? (
                        <Chat
                            conversation={currentConversation}
                            closeDialog={() => setCurrentConversation(null)}
                            user={user}
                        />
                    ) : (
                        <Conversations
                            conversations={conversations}
                            setConversation={(conversation: IConversation) => setCurrentConversation(conversation)}
                            userId={user.id}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default MessangerPage;
