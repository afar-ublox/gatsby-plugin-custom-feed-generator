import path from "path";
import { runQuery, writeFile } from "./internals";
import { buildFeed } from "./utils";
var fs = require("fs");
let publicPath = "./public";

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
  delete pluginOptions.plugins;
  const options = {
    ...pluginOptions,
  };

  const siteQuery = await runQuery(graphql, options.siteQuery);


  for (let feed of options.feeds) {
    const feedQuery = await runQuery(graphql, feed.query);
    const query = { ...siteQuery, ...feedQuery };
    const feedItems = feed.normalize({ query });
    
    const output = buildFeed(feedItems);

    if (!fs.existsSync(feed.path)) {
      fs.mkdirSync(feed.path, { recursive: true }, (err) => {});
    }
    

    if (feed.json) {
      // console.log(`Generating JSON feed for ${feed.name}.json @ ${feed.path}`)
      await writeFile(
        path.join(feed.path, `${feed.name}.json`),
        output.json1(),
        "utf8"
      ).catch((r) => {
        console.log(`Failed to write ${feed.path}/${feed.name}.json file: `, r);
      });
    }

    if (feed.xml) {
      // console.log(`Generating XML feed for ${feed.name}.xml @ ${feed.path}`)

      await writeFile(
        path.join(feed.path, `${feed.name}.xml`),
        output.rss2(),
        "utf8"
      ).catch((r) => {
        console.log(`Failed to write ${feed.path}/${feed.name}.xml file: `, r);
      });
    }

    if (feed.rss) {
      // console.log(`Generating RSS feed for ${feed.name} @ ${feed.path}`)

      await writeFile(
        path.join(feed.path, `${feed.rssName}`),
        output.rss2(),
        "utf8"
      ).catch((r) => {
        console.log(`Failed to write ${feed.path}/${feed.rssName} file: `, r);
      });
    }
  }

  return Promise.resolve();
};
