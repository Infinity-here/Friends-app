// import { Schema, model } from 'mongoose';

// const UserSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }]
// }, { timestamps: true });

// export default model('User', UserSchema);
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model("User", UserSchema);
