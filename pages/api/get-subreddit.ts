import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

import { env } from 'process';

const snoowrap = require('snoowrap');

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  const reddit_instance = new snoowrap({
    userAgent: env.USER_AGENT,
    clientId: env.CLIENT_ID,
    clientSecret: env.SECRET_KEY,
    refreshToken: env.REFRESH_TOKEN
  })
  //"all", "day", "hour", "month", "week", or "year" (default: "all").
  const { subreddit, selector, timeFilter } = req.body;
  let posts;
  let time = timeFilter || (selector === "Hot" || "New" ? "day" : "week");

  if (!subreddit) {
    posts = await reddit_instance.getHot({"time": timeFilter})
    res.json({ posts })
    return;
  }

  if (selector === "Hot") {
    posts = await reddit_instance.getSubreddit(subreddit).getHot({"time": timeFilter});
  } else if (selector === "Top") {
    posts = await reddit_instance.getSubreddit(subreddit).getTop({"time": timeFilter});
  } else if (selector === "New") {
    posts = await reddit_instance.getSubreddit(subreddit).getNew({"time": timeFilter});
  } else {
    posts = await reddit_instance.getSubreddit(subreddit).getHot({"time": timeFilter})
  }
  
  // Rest of the API logic
  res.json({ posts })
}
