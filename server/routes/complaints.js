import express from "express";
const router = express.Router();

import { getComplaints,postComplaint } from "../controllers/complaints.js";

router.post("/", postComplaint);
router.get("/", getComplaints);







export default router;