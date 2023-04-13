import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Avatar from "../../../../components/Avatar";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Post: React.FC = () => {
    const [isLiked, setIsLiked] = React.useState(false);

    return (
        <article className={styles.post}>
            <header className={styles.header}>
                <Avatar className={styles.avatar} />
                <div className={styles.title}>
                    <Link className={styles.name} to={"/"}>
                        Vasya Pupkin
                    </Link>
                    <div className={styles.time}>13:45</div>
                </div>
            </header>
            <p className={styles.text}>
                👨‍👩‍👦 На Школьной, 13 все уже подготовлено к заселению. Рядом с ним находятся еще два дома по улицам
                Республики 44 и 54.
            </p>
            <img className={styles.img} src="/img/posts/bears.jpg" alt="" />
            <footer className={styles.footer}>
                <button
                    className={cn(styles.reactionButton, isLiked && styles.active)}
                    onClick={() => setIsLiked((prev) => !prev)}
                >
                    {isLiked ? (
                        <AiFillHeart className={cn(styles.likeIcon, styles.active)} />
                    ) : (
                        <AiOutlineHeart className={styles.likeIcon} />
                    )}
                    <div className={cn(styles.reactionCounter, isLiked && styles.active)}>13</div>
                </button>
                <button className={styles.reactionButton}>
                    <FaRegComment className={styles.commentIcon} />
                    <div className={styles.reactionCounter}>10</div>
                </button>
            </footer>
        </article>
    );
};

export default Post;
