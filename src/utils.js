import { Feed } from "feed";
import urlJoin from "url-join";

const buildFeed = ({ site, items, name, addToHeader, path, options = {} }) => {
  const { siteUrl, description, title, author } = site.siteMetadata;
  const feed = new Feed({
    title: title,
    description: description,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${author}`,
    id: siteUrl,
    link: siteUrl,
    type: "application/rss+xml",
    // image: urlJoin(siteUrl, 'image.png'),
    favicon: urlJoin(siteUrl, "favicon.ico"),
    generator: "GatsbyJS",
    feedLinks: {
      json: urlJoin(siteUrl, name).replace(/\/+$/, "") + ".json",
      rss: urlJoin(siteUrl, name).replace(/\/+$/, "") + ".xml",
    },
    author: {
      name: author,
    },
    ...options,
    
  });

  for (let item of items) {
    console.log(item);
    feed.addItem(item);
  }
  return feed;
};

export { buildFeed };
