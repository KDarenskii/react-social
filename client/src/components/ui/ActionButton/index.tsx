import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    colorType: "success" | "danger" | "info" | "warning" | "custom";
}

const ActionButton: React.FC<Props> = ({ className, children, colorType, ...rest }) => {
    return (
        <button className={cn(styles.button, styles[colorType], className)} {...rest}>
            {children}
        </button>
    );
};

export default ActionButton;
