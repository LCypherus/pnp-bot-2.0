const mongoose = require('mongoose')

const reqString= {
    type: String,
    required: true
}

const muteSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    duration: reqString,
    reason: reqString,
    staffId: reqString,
    staffTag: reqString,
    expires: {
        type: Date,
        required: true
    },
    current: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('mute', muteSchema)