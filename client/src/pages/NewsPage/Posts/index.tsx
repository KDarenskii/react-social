import React from "react";
import Post from "./Post";

import styles from "./styles.module.scss";

const Posts: React.FC = () => {
    return (
        <ul className={styles.postsList}>
            <li className={styles.postItem}>
                <Post />
            </li>
            <li className={styles.postItem}>
                <Post />
            </li>
            <li className={styles.postItem}>
                <Post />
            </li>
            <li className={styles.postItem}>
                <Post />
            </li>
        </ul>
    );
};

export default Posts;
