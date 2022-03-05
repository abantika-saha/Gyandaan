import express from 'express';
const router = express.Router();

import {getBlogs,postBlogs,upVoteBlogs,deleteBlogs,updateBlogs} from '../controllers/blogs.js'

router.post("/create",postBlogs);
router.get("/",getBlogs);
router.put("/like/:id",upVoteBlogs);
router.delete("/:id",deleteBlogs);
router.put("/:id",updateBlogs);

export default router;