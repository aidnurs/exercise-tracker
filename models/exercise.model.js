const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    username: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: false },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
