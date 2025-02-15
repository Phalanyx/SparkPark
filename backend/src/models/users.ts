import mongoose from "mongoose";

mongoose.pluralize(null); 

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model("users", UserSchema);
