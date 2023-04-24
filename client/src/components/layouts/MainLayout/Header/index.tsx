import React from "react";
import Container from "../../../Container";
import { AiOutlineGlobal } from "react-icons/ai";
import Notices from "./Notifications";

import styles from "./styles.module.scss";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.titleWrapper}>
                        <h5 className={styles.title}>React Social</h5>
                        <AiOutlineGlobal className={styles.titleIcon} />
                    </div>
                    <div className={styles.actionsWrapper}>
                        <Notices />
                        <UserMenu />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
