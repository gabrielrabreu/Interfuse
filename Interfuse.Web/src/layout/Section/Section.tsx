import { WithDefaultChildren } from "@gabrielrabreu/sage-react";
import React from "react";
import classNames from "classnames";

import styles from "./Section.module.scss";

interface SectionProps extends WithDefaultChildren {}

const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <section className={classNames(styles.section, className)}>
      {children}
    </section>
  );
};

export default Section;
