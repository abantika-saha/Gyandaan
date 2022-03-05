import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from "./routes/user.js";
import bookingRouter from "./routes/booking.js";
import blogsRouter from './routes/blogs.js';
import discussionRoutes from "./routes/doubts.js";
import leaderboardRouter from "./routes/leaderboard.js";
import volunteerLeaderboardRouter from "./routes/volunteerLeaderboard.js";
import complaintRoutes from "./routes/complaints.js";


const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use("/blogs",blogsRouter);
app.use("/user", userRouter);
app.use("/discussion", discussionRoutes);
app.use("/booking", bookingRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/volunteerLeaderboard",volunteerLeaderboardRouter);
app.use("/complaint", complaintRoutes);

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));