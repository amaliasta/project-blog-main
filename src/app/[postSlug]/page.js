import React from "react";

import BlogHero from "@/components/BlogHero";
import { loadBlogPost } from "../../helpers/file-helpers";
import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import COMPONENT_MAP from "@/helpers/mdx-components";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { postSlug } = params;
    try {
        const { frontmatter } = await loadBlogPost(postSlug);
        const { title, abstract } = frontmatter;
        return {
            title: `${title} • ${BLOG_TITLE}`,
            description: abstract,
        };
    } catch {
        notFound();
    }
}

async function BlogPost({ params }) {
    const { postSlug } = params;
    const { frontmatter, content } = await loadBlogPost(postSlug);
    const { title, publishedOn } = frontmatter;

    return (
        <article className={styles.wrapper}>
            <BlogHero title={title} publishedOn={publishedOn} />
            <div className={styles.page}>
                <MDXRemote source={content} components={COMPONENT_MAP} />
            </div>
        </article>
    );
}

export default BlogPost;
