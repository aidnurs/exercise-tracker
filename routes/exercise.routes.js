const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');

router.get('/users', (req, res) => {
    User.find({})
        .select({ log: 0 })
        .exec((err, data) => {
            if (err) {
                res.status(400).send(err);
            }
            res.json(data);
        });
});

router.post('/new-user', (req, res) => {
    const user = new User({
        username: req.body.username,
    });
    user.save((err, data) => {
        if (err) {
            res.status(400).send(err);
        }
        res.json(data);
    });
});

router.post('/add', (req, res) => {
    User.findOne({ _id: req.body.userId }, (err, user) => {
        if (err) {
            res.status(400).send(err);
        }
        const exercise = new Exercise({
            username: user.username,
            _id: user._id,
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date,
        });
        exercise.save((err, data) => {
            if (err) {
            }
        });
        console.log(exercise);
        user.log.push(exercise);
        user.save();
        res.json(exercise);
    });
    // User.find({ username: req.body.username }, (err, user) => {
    //     user.log.push();
    // });
    // exercise.save((err, data) => {
    //     if (err) {
    //         res.status(400).send(err);
    //     }
    //     console.log(data);
    //     console.log(req.body);
    //     data.username = req.body.username;
    //     res.json(data);
    // });
});

router.get('/log', (req, res) => {
    User.find({ username: 'nursultan' }, (err, data) => {
        res.json(data);
    });
});

module.exports = router;
