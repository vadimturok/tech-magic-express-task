const express = require('express')
const {books} = require('../data')
const {validateReviewBody, validateBookId, validateReviewId} = require('../middlewares/reviews.middleware')

const router = express.Router()

router.get('/:bookId', validateBookId, (req, res) => {
    const {bookId} = req.params
    const book = books.find(book => book.id === Number(bookId))
    res.json(book.reviews)
})

router.post('/:bookId', validateBookId, validateReviewBody, (req, res) => {
    const {bookId} = req.params
    const review = req.body
    const bookIndex = books.findIndex(book => book.id === Number(bookId))
    books[bookIndex] = {...books[bookIndex],
        reviews: books[bookIndex].reviews.concat(review)}
    res.json(books[bookIndex])
})

router.delete('/:id/:bookId', validateBookId, validateReviewId, (req, res) => {
    const {id, bookId} = req.params
    const bookIndex = books.findIndex(book => book.id === Number(bookId))
    books[bookIndex] = {...books[bookIndex],
        reviews: books[bookIndex].reviews.filter(review => review.id !== Number(id))}
    res.json(books[bookIndex])
})

module.exports = router