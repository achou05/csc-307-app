import mongoose from "mongoose";

// definition schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  job: { type: String, required: true },
});

// creates model
const User = mongoose.model("User", userSchema);

export default User;
