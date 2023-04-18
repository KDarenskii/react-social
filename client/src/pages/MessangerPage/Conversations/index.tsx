import React from "react";
import { IConversation } from "../../../models/Conversation";
import ConversationSearch from "./ConversationSearch";
import Conversation from "./Conversation";

import styles from "./styles.module.scss";

type Props = {
    conversations: IConversation[];
    setConversation: (conversation: IConversation) => void;
    userId: string;
};

const Conversations: React.FC<Props> = ({ conversations, setConversation, userId }) => {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.searchWrapper}>
                    <ConversationSearch />
                </div>
            </header>
            <ul className={styles.conversationsList}>
                {conversations.map((conversation) => (
                    <li onClick={() => setConversation(conversation)} key={conversation.id}>
                        <Conversation userId={userId} conversation={conversation} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Conversations;
