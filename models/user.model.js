const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    count: { type: Number, required: false },
    log: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
