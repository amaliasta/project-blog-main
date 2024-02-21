
import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";
import { getBlogPostList } from "../helpers/file-helpers";
import styles from "./homepage.module.css";
import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants";

export const metadata = {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
};

async function Home() {
    const posts = await getBlogPostList();

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.mainHeading}>Latest Content:</h1>

            {posts.map(({ slug, ...delegated }) => {
                return (
                    <BlogSummaryCard
                        key={slug}
                        slug={slug}
                        {...delegated}
                    />
                );
            })}
        </div>
    );
}

export default Home;
