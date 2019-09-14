const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');

router.get('/users', (req, res) => {
    User.find({})
        .select({ log: 0, __v: 0 })
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
        let date = new Date();
        if (req.body.date !== '') {
            const unformattedDate = req.body.date.split('-');
            if (unformattedDate.length !== 3) {
                res.status(400).send('Invalid Date');
            }
            date = new Date(unformattedDate[0], unformattedDate[1] - 1, unformattedDate[2]);
        }
        const exercise = new Exercise({
            username: user.username,
            user_id: user._id,
            description: req.body.description,
            duration: req.body.duration,
            date: date,
        });
        exercise.save();
        user.log.push(exercise);
        user.save();
        res.json(exercise);
    });
});

router.get('/log', (req, res) => {
    User.findOne({ username: 'nursultan' })
        .populate('log')
        .select({ __v: 0 })
        .exec((err, data) => {
            res.json(data);
        });
});

module.exports = router;
