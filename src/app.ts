import express from "express"
import authRoutes from './routes/auth'
import postRoutes from './routes/post'
import bodyParser from 'body-parser'
import { connectDB } from './config/database'
import dotenv from 'dotenv'
import validate from './validations/base-validation'
import { validatePost } from './validations/create-validation'
import { verifyToken } from './middleware/auth'
dotenv.config()

const app = express()
const PORT = process.env.APP_PORT || 3000

connectDB()

app.use(bodyParser.json())

app.use('/api/auth', authRoutes)

app.use(verifyToken)

app.use('/api/posts', postRoutes)

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
)
