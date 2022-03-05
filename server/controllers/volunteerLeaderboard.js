import express from 'express';

import Volunteer from '../models/volunteer.js';

const router = express.Router();

export const getVolunteerLeaderboard = async (req, res) => { 
    try {
        const volunteerLeaderboard = await Volunteer.find();
                
        res.status(200).json(volunteerLeaderboard);
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}