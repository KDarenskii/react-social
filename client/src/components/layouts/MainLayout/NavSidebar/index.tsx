import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { ImNewspaper } from "react-icons/im";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

import styles from "./styles.module.scss";

const NavSidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <BiUserCircle className={styles.navIcon} />
                        My profile
                    </li>
                    <li className={styles.navItem}>
                        <ImNewspaper className={styles.navIcon} />
                        News
                    </li>
                    <li className={styles.navItem}>
                        <AiOutlineMessage className={styles.navIcon} />
                        Messenger
                    </li>
                    <li className={styles.navItem}>
                        <BsPeople className={styles.navIcon} />
                        Friends
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default NavSidebar;
