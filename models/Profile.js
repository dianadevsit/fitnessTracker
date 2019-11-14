const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
//schema for user profiles
const profileSchema = new mongoose.Schema({
    name: { type: String, required: 'Please enter your name!' },
    slug: String,
    gender: { type: String, required: 'Please select your gender!' },
    age: { type: Number, required: 'Please enter your age!' },
    about: { type: String, required: 'Please write something about you!' },
    created: { type: Date, default: Date.now },
    photo: { type: String },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'You must supply a user!'}
});
