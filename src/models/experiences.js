const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    position: { type: String, required: true },
    company: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true }
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
