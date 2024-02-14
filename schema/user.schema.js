import mongoose from "mongoose";
import PLM from "passport-local-mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

usersSchema.plugin(PLM);

const userModel = mongoose.model("user", usersSchema);

export { userModel };
