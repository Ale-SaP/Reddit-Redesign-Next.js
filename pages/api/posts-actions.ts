import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { env } from 'process'
const snoowrap = require('snoowrap')

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
  await runMiddleware(req, res, cors)

  const reddit_instance = new snoowrap({
    userAgent: env.USER_AGENT,
    clientId: env.CLIENT_ID,
    clientSecret: env.SECRET_KEY,
    refreshToken: env.REFRESH_TOKEN,
  })

  const { postId, action } = req.body

  try {
    const post = await reddit_instance.getSubmission(postId)
    if (action === 'upvote') {
      await post.unvote()
      await post.upvote()
    } else if (action === 'downvote') {
      await post.unvote()
      await post.downvote()
    } else if (action === 'none') {
      await post.unvote()
    } else if (action === 'save') {
      post.save()
    } else if (action === 'unsave') {
      post.unsave()
    }
    else {
    }
    res.status(202).json({ text: 'Done' })
  } catch (error) {
    res.status(401).json({ text: 'Failed' })
  }
}
