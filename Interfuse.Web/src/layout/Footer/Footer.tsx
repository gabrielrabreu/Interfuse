import React from "react";
import classnames from "classnames";
import {
  Footer as SageFooter,
  Typography,
  WithClassName,
} from "@gabrielrabreu/sage-react";

import styles from "./Footer.module.scss";

interface FooterProps extends WithClassName {}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <SageFooter className={classnames(styles.footer, className)}>
      <Typography variant="body">
        &copy; 2024 Interfuse. All rights reserved.
      </Typography>
    </SageFooter>
  );
};

export default Footer;
