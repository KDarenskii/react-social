import React from "react";
import { BsFillCameraFill } from "react-icons/bs";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
    src?: string;
    className?: string;
    imageClassName?: string;
    isOnline?: boolean;
};

const Avatar: React.FC<Props> = ({ className, imageClassName, src, isOnline }) => {
    return (
        <div className={cn(styles.avatar, className)}>
            {src ? (
                <img className={cn(styles.img, imageClassName)} src={src} alt="Avatar" />
            ) : (
                <BsFillCameraFill className={cn(styles.img, imageClassName)} />
            )}
            {isOnline && <div className={styles.onlineIcon}></div>}
        </div>
    );
};

export default Avatar;
