const express = require('express');
const {User,Thought} = require('./User','./Thought');

const router = express.Router();

router.get('/users',async (req, res)=>{
    try{
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    }catch(error) {
        res.status(500).json(error);
    }
});

router.get('users/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            res.status(404).json({msg:'Not Found'});
            return;
        }
        res.json(user);
    }catch(error) { 
        res.status(500).json(error);
    }
});

router.post('/users/:id',async(req,res)=>{
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    }catch(error){
        res.status(400).json(error)
    }
});

router.put('/users/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body, {
            new: true
        });
        if(!user) {
            res.status(404).json({msg:'Not Found'});
            return;
        }
        res.json(user);
    }catch(error) {
        res.status(400).json(error);
    }
});

router.delete('/users/:userId/friends/:friendId', async(req,res)=>{
    try{
        const {userId, friendId} = req.params;
        const user = await User.findById(userId);
        if(!user) {
            res.status(404).json({msg:'Not found'});
            return;
        }
        user.friends.pull(friendId);
        await user.save();
        res.json(user);
    }catch(error) {
        res.status(400).json(error);
    }
});

router.get('thoughts',async(req,res)=>{
    try{
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    }catch(error){
        res.status(500).json(error);
    }
});

router.get('thoughts/:id',async (req,res)=>{
    try{
        const thought = await Thought.findById(req.params.id).populate('reactions');
        if (!thought) {
            res.status(404).json({msg:'Not Found'});
            return;
        }
        res.json(thought);
    }catch(error) {
        res.status(500).json(error);
    }
});

router.post('/thoughts',async(req,res)=>{
    try{
        const{ thoughtText, username, userId} = req.body;
        const thought = await Thought.create({ thoughtText, username});
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({msg:'Not Found'});
            return;
        }
        user.thoughts.push(thought._id);
        await user.save();
        res.status(201).json(thought);
    }catch(error){
        res.status(400).json(error);
    }
});

router.put('/thoughts/:id', async (req,res)=>{
    try{
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if(!thought) {
            res.status(404).json({msg:'Not Found'});
            return;
        }
        res.json(thought);
    }catch(error) {
        res.status(400).json(error);
    }
});

router.delete('/thoughts/:id', async(req,res)=>{
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if(!deletedThought) {
            res.status(404).json({msg:'Not Found'});
            return;
        }
        res.json({msg: 'Deleted'});
    }catch (error) {
        res.status(400).json(error);
    }
});

router.post('/thoughts/:thoughtId/reactions', async (req,res)=>{
    try{
        const {thoughId} = req.params;
        const thought = await Thought.findById(thoughtId);
        if(!thought) {
            res.status(404).json({msg:'Not Found'});
            return;
        }
        thought.reactions.push(req.body);
        await thought.save();
        res.status(201).json(thought);
    }catch(error) {
        res.status(400).json(error);
    }
});

router.delete('/thoughts/:thoughtId/reactions/:reactionId', async(req,res)=>{
    try{
        const {thoughtId, reactionId} = req.params;
        const thought = await Thought.findById(thoughtId);
        if(!thought){
            res.status(404).json({msg:'Not Found'});
            return;
        }
        thought.reactions.pull(reactionId);
        await thought.save();
        res.json(thought);
    }catch(error){
        res.status(400).json(error);
    }
});

module.exports = router;
