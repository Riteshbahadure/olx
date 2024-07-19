const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dkjvbvs6v/image/upload/v1721291321/Screenshot_2024-07-18_135813_cbzc3q.png"
        // required:true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: true
    },
    code: {
        type: String,
        // default: true
    },
    active: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    mobile: {
        type: String,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model("user", userSchema)