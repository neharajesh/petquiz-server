const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    playedGames: [{
        quiz: {
            type: Schema.Types.ObjectId,
            ref: 'Quiz'
        },
        highScore: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
})

const User = mongoose.model("User", UserSchema)

module.exports = { User }