import express from "express";
const router = express.Router();

import {availableTimeSlots,getSlots,bookSlot,getBookings,getVolunteerBookings,cancelBooking,removeBooking,getMeetings,removesBooking} from "../controllers/booking.js";

router.post("/availableTimeSlots", availableTimeSlots);
router.get("/getSlots", getSlots);
router.post("/bookSlot", bookSlot);
router.get("/getBookings", getBookings);
router.get("/getVolunteerBookings", getVolunteerBookings);
router.post("/cancelBooking", cancelBooking);
router.post("/removeBooking", removeBooking);
router.post("/removesBooking", removesBooking);
router.get("/",getMeetings)




export default router;