import argon2 from 'argon2'
import dotenv from 'dotenv'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { responseBadRequest, responseError } from '../utils/response'
dotenv.config()


// @route POST api/auth/register
// @desc Register user
// @access Public
export const register: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return responseBadRequest(res, "Missing username and/or password!")
  }
  try {
    const user = await User.findOne({ username })
    if (user) {
      return responseBadRequest(res, "Username already!")
    }
    const hashedPassword = await argon2.hash(password)
    const newUser = new User({ username, password: hashedPassword })
    newUser.save()
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET || '')

    return res.json({
      success: true,
      message: "Register successfully!",
      accessToken: accessToken
    })
  } catch (error) {
    console.log(error)
    return responseError(res, error)
  }
}

// @route POST api/auth/login
// @desc Login user
// @access Public
export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return responseBadRequest(res, "Missing username and/or password!")
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return responseBadRequest(res, "Incorrect user!")
    }
    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid) {
      return responseBadRequest(res, "Incorrect password!")
    }
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET || '')
    return res.json({
      success: true,
      message: "Login successfully!",
      accessToken: accessToken
    })
  } catch (error) {

  }
}
