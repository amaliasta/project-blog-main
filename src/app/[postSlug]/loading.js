import Spinner from "@/components/Spinner";
import styles from "./postSlug.module.css";

function BlogPost() {
    return (
        <article className={styles.wrapper}>
            <Spinner />
        </article>
    );
}

export default BlogPost;
