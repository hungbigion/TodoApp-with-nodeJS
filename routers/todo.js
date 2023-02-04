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

module.exports = router;
