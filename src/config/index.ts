import dotenv from 'dotenv'
dotenv.config()

export const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.n1i7rnl.mongodb.net/?retryWrites=true&w=majority`