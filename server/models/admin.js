import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
});

const admin = mongoose.model("admin", adminSchema);
export default admin;
