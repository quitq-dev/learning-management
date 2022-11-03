import mongoose, { Schema, Model, Document } from 'mongoose'

type IPost = Document & {
  title: string,
  description: string,
  url: string,
  status: string,
  user: any
}

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  status: {
    type: String,
    enum: ['TO LEARN', 'LEARNING', 'LEARNED']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export const Post: Model<IPost> = mongoose.model<IPost>('posts', postSchema)