const express = require("express")
const router = express()
const { extend } = require("lodash")

const { Quiz } = require("../models/quiz-model")

router.route("/")
.get(async(req, res) => {
    try {
        const allQuizzes = await Quiz.find({})
        res.json({success: true, message: "All Quizzes Retrieved", quizzes: allQuizzes})
    } catch (err) {
        console.log("Quizzes could not be retrieved")
        res.json({success: false, message: "Quizzes could not be retrieved", errMessage: err.message})
    }
})
.post(async(req, res) => {
    try {
        const newQuiz = new Quiz(req.body)
        const savedQuiz = await newQuiz.save()
        res.json({success: true, message: "Quiz Saved Successfully", quiz: savedQuiz})
    } catch (err) {
        console.log("Quiz could not be added")
        res.json({success: false, message: "Quiz could not be added", errMessage: err.message})
    }
})

router.param("quizId", async(req, res, next, quizId) => {
    try {
        const quiz = await Quiz.findById(quizId)
        if(!quiz) {
            console.log("Quiz not found")
            res.json({success: false, message: "Quiz not found"})
        }
        req.quiz = quiz
        next()
    } catch (err) {
        console.log("Error finding quiz with id", quizId)
        res.json({success: false, message: "Error finding quiz with this id", errMessage: err.message})
    }
})

router.route("/:quizId")
.get(async(req, res) => {
    let { quiz } = req
    res.json({success: true, message: "Quiz retrieved", quiz: quiz})
})
.post(async(req, res) => {
    try {
        let { quiz } = req
        let quizUpdates = req.body
        quiz = extend(quiz, quizUpdates)
        quiz = await quiz.save()
        res.json({success: true, message: "Quiz updated successfully", quiz: quiz})
    } catch (err) {
        console.log("Quiz could not be updated")
        res.json({success: false, message: "Quiz could not be updated", errMessage: err.message})
    }
})
.delete(async(req, res) => {
    try {
        let { quiz } = req
        await quiz.remove()
        res.json({success: true, message: "Quiz deleted successfully"})
    } catch (err) {
        console.log("Quiz could not be deleted")
        res.json({success: false, message: "Quiz could not be deleted", errMessage: err.message})
    }
})

module.exports = router