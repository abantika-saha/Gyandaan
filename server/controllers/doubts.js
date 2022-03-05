import express from 'express';
import mongoose from 'mongoose';

import Discussion from '../models/discussion.js';
import Student from '../models/student.js';

const router = express.Router();

export const getDoubts = async (req, res) => { 
    try {
        const doubts = await Discussion.find();
                
        res.status(200).json(doubts);
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const getDoubt = async (req, res) => {     
    const { id } = req.params; 

    try {
        const doubt = await Discussion.findById(id);
        
        res.status(200).json(doubt);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} 

export const createDoubt = async (req, res) => {
    const doubt = req.body;


    

    try {
        const newDiscussion = new Discussion({ name: req.body.name, question: req.body.question, creator: req.body.creator });
        await newDiscussion.save();

        res.status(201).json(newDiscussion );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateDoubt = async (req, res) => {
    const { id } = req.params;
    const { name, question } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedDoubt = { name, question, _id: id };

    await Discussion.findByIdAndUpdate(id, updatedDoubt, { new: true });

    res.json(updatedDoubt);
}

export const deleteDoubt = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Discussion.findByIdAndRemove(id);

    res.json({ message: "Question deleted successfully." });
}

export const commentDoubt = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const doubt = await Discussion.findById(id);
    console.log(value);


    doubt.comments.push(value);
    let str="";
    for(let i=0;i<value.length;i++){
        if(value[i]==':'){
            break;
        }
        str=str+value[i];
    }
    console.log(str);
  const updatedDoubt = await Discussion.findByIdAndUpdate(id, doubt, {
    new: true,
  });

  res.json(updatedDoubt);

  Student.find({ name: str }, function (err, docs) {
    if (docs.length == 0) {
      console.log("volunteer");
    } else {
      console.log(docs[0].dayCount);
      let val = docs[0].dayCount;
      docs[0].dayCount = val + 1;
      console.log(docs[0].dayCount);
      docs[0].save();
    }
  });
};