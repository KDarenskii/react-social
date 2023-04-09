import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/ui/Input";
import { BsTriangleFill } from "react-icons/bs";

import styles from "./styles.module.scss";
import Message from "./Message";

type Props = {
    closeDialog: () => void;
};

const Chat: React.FC<Props> = ({ closeDialog }) => {
    return (
        <div className={styles.chat}>
            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <div className={styles.backButton} onClick={closeDialog}>
                        <FaChevronLeft className={styles.backIcon} />
                        <span className={styles.backText}>Back</span>
                    </div>
                    <div className={styles.title}>
                        <Link to="/" className={styles.name}>
                            Alex Vacovsky
                        </Link>
                        <div className={styles.status}>Online</div>
                    </div>
                    <Avatar className={styles.avatar} />
                </div>
            </header>
            <ul className={styles.messagesList}>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
                <li className={styles.messageItem}>
                    <Message />
                </li>
            </ul>
            <footer className={styles.footer}>
                <div className={styles.footerWrapper}>
                    <form className={styles.form}>
                        <Input className={styles.input} placeholder="Write a message..." />
                        <button type="submit">
                            <BsTriangleFill className={styles.sendIcon} />
                        </button>
                    </form>
                </div>
            </footer>
        </div>
    );
};

export default Chat;
