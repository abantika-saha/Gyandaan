import complaint from "../models/complaint.js";


export const postComplaint = async (req, res) => {

    const { studentId, volunteerId, bookingId, description } = req.body;
    console.log(req.body);
    const complainte = await complaint.create({ studentId: studentId, volunteerId: volunteerId,  description: description, bookingId: bookingId });
    res.send(complainte);
}

export const getComplaints = async (req, res) => {
    const complaints = await complaint.find();
    res.send(complaints);
}


