import React from "react";
import cn from "classnames";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import styles from "./styles.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const DialogSearch: React.FC<Props> = ({ className, ...rest }) => {
    return (
        <label className={styles.label}>
            <BiSearch className={styles.searchIcon} />
            <input className={cn(styles.input, className)} placeholder="Search" {...rest} />
            <IoMdClose className={styles.cancelIcon} />
        </label>
    );
};

export default DialogSearch;
