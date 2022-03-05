import mongoose from "mongoose";

export const meetingSchema = mongoose.Schema({
  studentId: { type: String, required: true },
  volunteerId: { type: String, required: true },
  date: {
    type: Date,
  },
  time: { type: String, required: true },
  meetLink: { type: String, required: true },
  subject: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default:"confirmed" },
});


const meeting = mongoose.model("meeting", meetingSchema);
export default meeting;
