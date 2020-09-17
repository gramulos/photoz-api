import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    message: { type: String, trim: true, unique: false, required: true },
    username: { type: String, unique: false, required: true },
    mediaId: { type: String, unique: false, required: true },
  },
  { timestamps: true },
);

const CommentModel = mongoose.model('Comment', commentSchema);

const save = async model => new CommentModel(model).save();

const getCommentsByPost = async mediaId => CommentModel.find({ mediaId });

export { save, getCommentsByPost, commentSchema };
