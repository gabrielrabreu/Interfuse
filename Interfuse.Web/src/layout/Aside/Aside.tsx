import React from "react";
import { Icon, Aside as SageAside } from "@gabrielrabreu/sage-react";

import styles from "./Aside.module.scss";

interface AsideProps {
  isAsideOpen: boolean;
}

const Aside: React.FC<AsideProps> = ({ isAsideOpen }) => {
  return (
    <SageAside
      className={styles.aside}
      hidden={!isAsideOpen}
      hiddenClassName={styles.asideHidden}
    >
      <SageAside.Nav>
        <SageAside.NavItem icon={<Icon name="Home" />} text="Home" link="/" />
      </SageAside.Nav>
    </SageAside>
  );
};

export default Aside;
