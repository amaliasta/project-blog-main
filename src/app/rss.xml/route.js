import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants";
import { getBlogPostList } from "../../helpers/file-helpers";
import RSS from "rss";

const feedOptions = {
    title: BLOG_TITLE,
    description: "rss feed",
    feed_url: "http://localhost:3000/rss.xml",
    site_url: "http://localhost:3000/",
};

export async function GET() {
    const feed = new RSS(feedOptions);

    const blogItems = await getBlogPostList();

    for (let item of blogItems) {
        const { title, publishedOn, description, slug } = item;
        const itemOptions = {
            title: title,
            date: publishedOn,
            description: description,
            url: `./${slug}`,
        };
        feed.item(itemOptions);
    }

    const xml = feed.xml({ indent: true });

    const res = new Response(xml, {
        headers: { "Content-Type": "application/xml" },
    });
    return res;
}
