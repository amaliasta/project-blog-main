import Link from "next/link";
import styles from "./not-found.module.css";
import { BLOG_TITLE } from "@/constants";


export const metadata = {
    title: `404 Not found • ${BLOG_TITLE}`,
  };

export default function NotFound() {
    return (
        <div className={styles.page}>
                <header className={styles.header}>
                    <h2>404 - Resource Not Found</h2>
                </header>
                <div className={styles.content}>
                    <p>Could not find requested resource</p>
                    <Link href="/">Return Home</Link>
                </div>
        </div>
    );
}
