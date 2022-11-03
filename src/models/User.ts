import mongoose, { Schema, Model, Document } from 'mongoose'

type IUser = Document & {
  username: string
  password: string
  createdAt: Date
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
)

export const User: Model<IUser> = mongoose.model<IUser>('users', userSchema)