import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.APP_PORT
export const mongoURL = process.env.MONGO_URL || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.n1i7rnl.mongodb.net/?retryWrites=true&w=majority`
