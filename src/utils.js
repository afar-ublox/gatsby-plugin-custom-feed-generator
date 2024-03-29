import { Feed } from "@u-blox/custom-feed";

const buildFeed = (items) => {
  const feed = new Feed();

  for (let item of items) {
    feed.addItem(item);
  }
  return feed;
};

export { buildFeed };
