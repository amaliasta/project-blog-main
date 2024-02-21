const RSS = require('rss');
const fs = require('fs/promises');
const { getBlogPostList } = require('../src/helpers/file-helpers.js'); // won't work because this file attemps to use ESmodules import... got stuck here :(
const { BLOG_TITLE } = require("../src/constants.js");

async function generateRSS() {
    const feedOptions = {
        title: BLOG_TITLE,
        feed_url: "http://localhost:3000/rss.xml",
        site_url: "http://localhost:3000/"
    };

    const feed = new RSS(feedOptions);

    const blogItems = await getBlogPostList();

    for (let item of blogItems) {
        const { title, publishedOn, description, slug } = item;
        const itemOptions = {
            title: title,
            date: publishedOn,
            description: description,
            url: `${feedOptions.site_url}/${slug}`,
        };
        feed.item(itemOptions);
    }

    const xml = feed.xml({ indent: true });

    // Write the XML feed to a file
    await fs.writeFile('rss.xml', xml);
}

generateRSS().catch(error => {
    console.error('Failed to generate RSS feed:', error);
});