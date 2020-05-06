import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavigationItem.module.css";

const navigationItem = (props) => (
  <li
    className={styles.NavigationItem}
  >
    <Link
        to={props.link}
        className={props.active ? styles.active : null}
    >
      {props.children}
    </Link>
  </li>
);

export default navigationItem;