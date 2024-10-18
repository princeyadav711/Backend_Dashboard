const mongoose = require('mongoose')
const db = require('../config/DB')

const userSchema = new mongoose.Schema(
    {  
        _id : mongoose.Schema.Types.ObjectId,
        'name': { type: String },
        'age': { type: Number },
        'power': { type: String },
        'hobbies': { type: String }
    }
)

module.exports = mongoose.model('marvels', userSchema)