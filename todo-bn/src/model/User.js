const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')


const userSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
})


const User = moongose.model('User', userSchema)

module.exports = User