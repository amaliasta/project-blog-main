"use client";

import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import Link from 'next/link';

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

import styles from "./Header.module.css";
import Cookie from "js-cookie";

function Header({ className, initialTheme, ...delegated }) {
    const [theme, setTheme] = React.useState(initialTheme);

    function handleToggleTheme() {
        const nextTheme = theme === "light" ? "dark" : "light";

        setTheme(nextTheme);

        Cookie.set("color-theme", nextTheme, {
            expires: 1000,
        });

        const newTokens = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
        const root = document.documentElement;

        root.setAttribute("data-color-theme", nextTheme);
        const themePropertiesArray = Object.entries(newTokens);
        themePropertiesArray.forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }

    const href = `/rss.xml`;

    return (
        <header className={clsx(styles.wrapper, className)} {...delegated}>
            <Logo />

            <div className={styles.actions}>
                <Link href={href} className={styles.action}>
                    <Rss
                        size="1.5rem"
                        style={{
                            // Optical alignment
                            transform: "translate(2px, -2px)",
                        }}
                    />
                    <VisuallyHidden>View RSS feed</VisuallyHidden>
                </Link>

                <button className={styles.action} onClick={handleToggleTheme}>
                    {theme === "light" ? (
                        <Sun size="1.5rem" />
                    ) : (
                        <Moon size="1.5rem" />
                    )}
                    <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
                </button>
            </div>
        </header>
    );
}

export default Header;
