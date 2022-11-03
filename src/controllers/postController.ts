import { RequestHandler } from 'express'
import { Post } from '../models/Post'
import { responseError, responseUnauthenticated } from '../utils/response'

// @route GET api/posts
// @desc Get posts
// @access private
export const index: RequestHandler = async (req: any, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', 'username')
    return res.json({
      success: true,
      data: posts
    })
  } catch (error) {
    console.log(error)
    return responseError(res, error)
  }
}

// @route POST api/posts
// @desc Create post
// @access private
export const create: RequestHandler = async (req, res) => {
  const { title, description, url, status } = req.body
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith('https://') ? url : `https://${url}`,
      status: status || 'TO_LEARN',
      user: '6361d2b0da09ac7cae3ccd6c'
    })
    await newPost.save()

    return res.json({
      success: true,
      message: "Create post successfully!",
      data: newPost
    })
  } catch (error) {

  }
  console.log("post ok!")
}

// @route PUT api/posts
// @desc Update post
// @access private
export const update: RequestHandler = async (req: any, res) => {
  const { title, description, url, status } = req.body
  try {
    const updatedPost = {
      title,
      description: description || '',
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'TO LEARN'
    }
    const postUpdateCondition = { _id: req.params.id, user: req.userId }
    const result = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    )
    if (!result) {
      return responseUnauthenticated(res)
    }

    return res.json({
      success: true,
      message: "Post updated!",
      data: result
    })
  } catch (error) {
    console.log(error)
    return responseError(res, error)
  }
}

// @Route Delete api/posts
// @Desc Delete post
// @access Private
export const deletePost: RequestHandler = async (req: any, res) => {
  try {
    const deletePostCondition = { _id: req.params.id, user: req.userId }
    const deletePost = await Post.findByIdAndDelete(deletePostCondition)
    if (!deletePost) {
      return responseUnauthenticated(res)
    }
    return res.json({
      success: true,
      message: "Post deleted!",
      post: deletePost
    })
  } catch (error) {
    console.log(error)
    return responseError(res, error)
  }
} 