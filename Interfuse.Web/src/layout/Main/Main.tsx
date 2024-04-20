import React from "react";
import { Outlet } from "react-router-dom";
import classnames from "classnames";
import { WithClassName } from "@gabrielrabreu/sage-react";

import styles from "./Main.module.scss";

interface MainProps extends WithClassName {}

const Main: React.FC<MainProps> = ({ className }) => {
  return (
    <main className={classnames(styles.main, className)}>
      <Outlet />
    </main>
  );
};

export default Main;
