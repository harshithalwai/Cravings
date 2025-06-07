import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      match: /^[a-zA-Z\s]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: true, timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
