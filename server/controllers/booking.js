import volunteer from "../models/volunteer.js";
import student from "../models/student.js";
import meeting from "../models/meeting.js";
import dailyLogin from "../models/dailyLogin.js";

export const availableTimeSlots = async (req, res) => {
    const id = req.body.user.result._id;
    const availableSlots = req.body.availableslots;
    const curuser = await volunteer.findOneAndUpdate({ _id: id }, { $push: { availableSlots: availableSlots } });
}

export const getSlots = async (req, res) => {
    const { subject, year,language } = req.query;
    const volunteers = await volunteer.find({ subject: subject, classRange: year, languages: language });
    let tslots = volunteers.map(volunteer => volunteer.availableSlots);
    let slots = [].concat.apply([], tslots);
    let uniqslots=[...new Set(slots)];
    uniqslots.sort();
    console.log(uniqslots);


   
    res.send(uniqslots);

}

export const bookSlot = async (req, res) => {
   
    try{
        const { slot, userId, subject, year, description } = req.body;
        let sa = slot.split(/(\s+)/)
        const slotDate = sa[0];
        const slotTime = sa[2];
    
      
        const stu = await student.findOne({ _id: userId });
    
        const vol = await volunteer.findOneAndUpdate({ subject: subject, classRange: year, availableSlots: slot }, { $pull: { availableSlots: slot } });

        await volunteer.findOneAndUpdate({_id:vol._id},{$inc:{score:1}});
    
        const meetLink = `https://meet.jit.si/${userId}-${subject}-${year}-${vol._id}m  `;
        const meet = await meeting.create({ studentId: userId, volunteerId: vol._id, date: slotDate, time: slotTime, meetLink: meetLink, subject: subject, year: year, description: description });
        
        res.status(200).json(meet);
     
    } catch(err){
        console.log(err);
    }
 


   

}

export const getBookings = async (req, res) => {
    const { userId } = req.query;
    
    const bookings = await meeting.find({ studentId: userId });
   
    res.send(bookings);
}

export const getVolunteerBookings = async (req, res) => {
    
    const { userId } = req.query;
   
    const bookings = await meeting.find({ volunteerId: userId });
  
    res.send(bookings);
   
}

export const cancelBooking = async (req, res) => {
    const { bookingId } = req.body;
    const book = await meeting.findOneAndUpdate({ _id: bookingId }, { $set: { status: "cancelled" } });
    const bookings = await meeting.find();

    res.send(bookings);
}

export const removeBooking = async (req, res) => {
    const { bookingId } = req.body;
    const book = await meeting.findOneAndUpdate({ _id: bookingId }, { $set: { status: "completed" } });
    const bookings = await meeting.find();

    res.send(bookings);
}
export const removesBooking = async (req, res) => {
    const { bookingId } = req.body;
    const book = await meeting.findOneAndUpdate({ _id: bookingId }, { $set: { status: "fcompleted" } });
    const bookings = await meeting.find();

    res.send(bookings);
}

export const getMeetings = async (req, res) => {
    const bookings = await meeting.find();
   
    res.send(bookings);
}




