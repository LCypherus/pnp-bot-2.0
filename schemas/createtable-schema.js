const mongoose = require('mongoose')

const reqString= {
    type: String,
    required: true
}

const createTableSchema = mongoose.Schema({
    guildId: reqString,
    shortName: reqString,
    longName: reqString,
})

module.exports = mongoose.model('createTable', createTableSchema)