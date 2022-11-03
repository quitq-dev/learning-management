import { DB_URL } from './index'
import { connect } from "mongoose"

export const connectDB = async () => {
  try {
    await connect(DB_URL)
    console.log("MongoDB Connected...")
  } catch (err: any) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}