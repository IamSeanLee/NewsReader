import { query } from "../db/db.js";

export const getSub = async (userId) => {
  const result = await query("SELECT feeds FROM subscription WHERE userid=$1", [
    userId,
  ]);

  const feeds = result[0].feeds;
  const collector = [];

  if (feeds.length > 0) {
    await Promise.all(
      feeds.map(async (feed) => {
        const data = await query("SELECT * FROM feed WHERE id=$1", [feed]);
        if (data[0]) {
          collector.push(data[0]);
        }
      })
    );
  }
  return collector;
};

export const subscribe = async (userId, feed) => {
  await query(
    "INSERT INTO feed(id, title, visualurl, url, description, updated) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(id) DO NOTHING",
    [
      feed.id,
      feed.title,
      feed.visualurl,
      feed.website,
      feed.description,
      feed.updated,
    ]
  );

  // Create new entry for user if the user does not have any subscription info yet
  // Update sub entry if it exists.
  await query(
    "INSERT INTO subscription(userid, feeds) VALUES ($1, $2) ON CONFLICT(userid) " +
      "DO UPDATE SET feeds=(SELECT ARRAY(SELECT DISTINCT UNNEST(feeds || $2)) from subscription " +
      "WHERE subscription.userid=$1)",
    [userId, [feed.id]]
  );
};

export const unsubscribe = async (userId, id) => {
  await query(
    "UPDATE subscription SET feeds = (SELECT ARRAY_REMOVE(feeds, $1) FROM subscription WHERE userid=$2)",
    [id, userId]
  );
};
