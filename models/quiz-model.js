const mongoose = require("mongoose")
const { Schema } = mongoose

const QuizSchema = new Schema({
    quizName: {
        type: String,
        required: true
    },
    categories: Array,
    totalPoints: {
        type: Number,
        required: true
    },
    questionsList: [{
        questionText: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            required: true
        },
        options: [{
            optionText: {
                type: String,
                required: true
            },
            isRight: {
                type: Boolean,
                required: true
            },
            explanation: String
        }]
    }]
})

const Quiz = mongoose.model("Quiz", QuizSchema)

module.exports = { Quiz }