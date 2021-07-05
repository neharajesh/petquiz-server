const mongoose = require("mongoose")
const { Schema } = mongoose

const QuizSchema = new Schema({
    quizName: {
        type: String,
        required: true
    },
    image: String,
    categories: Array,
    description: String,
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
        explanation: String,
        image: String,
        options: [{
            optionText: {
                type: String,
                required: true
            },
            isRight: {
                type: Boolean,
                required: true
            }
        }]
    }]
})

const Quiz = mongoose.model("Quiz", QuizSchema)

module.exports = { Quiz }