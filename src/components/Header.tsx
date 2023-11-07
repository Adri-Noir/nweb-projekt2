import React, { PropsWithChildren } from "react";
import styles from "../styles/Header.module.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Header = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <div className={`${styles.container} ${inter.className}`}>
        <h4>
          <Link className={styles.link} href={"/"}>
            XSS
          </Link>
        </h4>
        <h4>
          <Link className={styles.link} href={"/sde"}>
            Sensitive Data Exposure
          </Link>
        </h4>
      </div>
      <main className={inter.className}>{children}</main>
    </>
  );
};

export default Header;
