import { mongoURL } from './main'
import { connect } from "mongoose"

export const connectDB = async () => {
  try {
    await connect(mongoURL)
    console.log("MongoDB Connected...")
  } catch (err: any) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}