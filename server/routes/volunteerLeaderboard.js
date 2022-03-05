import express from 'express';
const router = express.Router();

import {getVolunteerLeaderboard} from '../controllers/volunteerLeaderboard.js'

router.get("/",getVolunteerLeaderboard);

export default router;