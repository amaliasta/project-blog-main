import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';

export async function getBlogPostList() {
  const fileNames = await readDirectory('/content');

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(
      `/content/${fileName}`
    );

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) =>
    p1.publishedOn < p2.publishedOn ? 1 : -1
  );
}


const delay = (ms) => new Promise((resolve) => (
  setTimeout(resolve, ms)
));

export const loadBlogPost = React.cache(async function (slug) {
  console.log('reading', slug)

  await delay(2000);

  const rawContent = await readFile(
    `/content/${slug}.mdx`
  );

  const { data: frontmatter, content } =
    matter(rawContent);

  return { frontmatter, content };
})

function readFile(localPath) {
  return fs.readFile(
    path.join(process.cwd(), localPath),
    'utf8'
  );
}

function readDirectory(localPath) {
  return fs.readdir(
    path.join(process.cwd(), localPath)
  );
}
