import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { ImNewspaper } from "react-icons/im";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
import { FRIENDS_ROUTE, MESSENGER_ROUTE, NEWS_ROUTE } from "../../../../constants/routesPathnames";

const NavSidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to={"/"}>
                            <BiUserCircle className={styles.navIcon} />
                            My profile
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to={NEWS_ROUTE.PATH}>
                            <ImNewspaper className={styles.navIcon} />
                            News
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to={MESSENGER_ROUTE.PATH}>
                            <AiOutlineMessage className={styles.navIcon} />
                            Messenger
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to={FRIENDS_ROUTE.PATH}>
                            <BsPeople className={styles.navIcon} />
                            Friends
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default NavSidebar;
