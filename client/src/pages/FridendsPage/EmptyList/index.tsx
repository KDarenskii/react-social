import React from "react";

import styles from "./styles.module.scss";

const EmptyList: React.FC = () => {
    return <div className={styles.content}>List is currently empty</div>;
};

export default EmptyList;
