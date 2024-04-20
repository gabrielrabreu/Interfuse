import React, { useState } from "react";
import classnames from "classnames";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";

import styles from "./Layout.module.scss";

const Layout: React.FC = () => {
  const [isAsideOpen, setAsideOpen] = useState(true);
  const toggleAside = () => setAsideOpen((curr) => !curr);

  return (
    <div className={styles.container}>
      <Header toggleAside={toggleAside} />
      <Aside isAsideOpen={isAsideOpen} />
      <Main
        className={classnames({
          [styles.asideOpen]: isAsideOpen,
        })}
      />
      <Footer
        className={classnames({
          [styles.asideOpen]: isAsideOpen,
        })}
      />
    </div>
  );
};

export default Layout;
