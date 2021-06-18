const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const botStatusSchema = mongoose.Schema({
    _id: reqString,
    status: reqString,
})

module.exports = mongoose.model('Bot-status', botStatusSchema)