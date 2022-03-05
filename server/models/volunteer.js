import mongoose from "mongoose";

const volunteerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  classRange: { type: [Number], required: true },
  subjects: { type: [String], required: true },
  languages: { type: [String], required: true },
  availableSlots: { type: [String] },
  sessionsTaken: {
    type: Number,
    default: 0,
  },
  userType: { type: String },
  score: {
    type: Number,
    default: 0,
  },
});

const volunteer = mongoose.model("volunteer", volunteerSchema);
export default volunteer;
