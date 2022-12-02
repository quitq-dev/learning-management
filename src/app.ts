import bodyParser from 'body-parser'
import express from "express"
import { connectDB } from './config/database'
import { port } from './config/main'
import { verifyToken } from './middleware/auth'
import authRoutes from './routes/auth'
import postRoutes from './routes/post'

const app = express()

connectDB()

app.use(bodyParser.json())

app.use('/api/auth', authRoutes)

app.use(verifyToken)

app.use('/api/posts', postRoutes)

app.listen(port, () =>
  console.log(`Server started on port ${port}`)
)
