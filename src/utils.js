import { Feed } from "feed";
import urlJoin from "url-join";

const buildFeed = ({ items }) => {
  const feed = new Feed();

  for (let item of items) {
    feed.addItem(item);
  }
  return feed;
};

export { buildFeed };
