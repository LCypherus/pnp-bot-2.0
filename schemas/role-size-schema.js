const mongoose = require('mongoose')

const reqString= {
    type: String,
    required: true
}

const roleSizeSchema = mongoose.Schema({
    guildId: reqString,
    channelId: reqString,
    roleId: reqString,
    channelName: reqString
})

module.exports = mongoose.model('role-size-chanels', roleSizeSchema)