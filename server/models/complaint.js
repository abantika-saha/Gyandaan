import mongoose from "mongoose";

export const complaintSchema = mongoose.Schema({
  studentId: { type: String, required: true },
  volunteerId: { type: String, required: true },
 bookingId: { type: String, required: true },
 description: { type: String, required: true },
});


const complaint = mongoose.model("complaint", complaintSchema);
export default complaint;