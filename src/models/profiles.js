const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
    name: String,
    age: Number,
    website: String,
    degree: String,
    city: String,
    // Add other fields as needed
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);
