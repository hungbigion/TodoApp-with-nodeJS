const express = require('express');
const router = express.Router();
const auth = require('../middleware/user_jwt');

const Todo = require('../models/Todo');

// create a new todo task
router.post('/',auth, async (req, res, next) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user.id
        })
        if (!todo){
            return res.status(400).json({
                success: false,
                msg: 'wrong'
            });
        }
        res.status(200).json({
            success: true,
            todo: todo,
            msg: 'Successfully created'
        });
    } catch (error) {
        next(error);
    }
});

// desc fetch all todos
// method get
router.get('/', auth, async (req, res, next) => {
    try {
        const todo = await Todo.find({
            user: req.user.id,
            finished: false
        })
        if (!todo){
            return res.status(400).json({ success: false, msg: 'Error'})
        }
        res.status(200).json({
            success: true,count: todo.length,todos: todo, msg:'Success'})
    } catch (error) {
        next(error);
    }
});
// desc fetch all todo finished
router.get('/finished', auth, async (req, res, next) => {
    try {
        const todo = await Todo.find({
            user: req.user.id,
            finished: true
        })
        if (!todo){
            return res.status(400).json({ success: false, msg: 'Error'})
        }
        res.status(200).json({
            success: true,count: todo.length,todos: todo, msg:'Success'})
    } catch (error) {
        next(error);
    }
});

// update task method put
router.put('/:id', async(req, res, next) => {
    try {
        let todo  = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(400).json({success: false, msg: 'Task not exist'});
        }
        todo = await Todo.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        return res.status(200).json({
            success: true,todo: todo, msg: 'Success update'});

    } catch (error) {
        next(error);
    }
});

// desc delete task
router.delete('/:id', async(req, res, next) => {
    try {
        let todo  = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(400).json({success: false, msg: 'Task not exist'});
        }
        todo = await Todo.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true, msg: 'Deleted'});

    } catch (error) {
        next(error);
    }
});

module.exports = router;
