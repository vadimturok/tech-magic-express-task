const createError = require('http-errors')
const {books} = require('../data')

const validateReviewBody = (req, res, next) => {
    if(!req.body.id){
        next(createError(400, 'Review id not provided'))
    }
    if(!req.body.comment){
        next(createError(400, 'Review comment not provided'))
    }
    next()
}

const validateBookId = (req, res, next) => {
    const {bookId} = req.params
    const book = books.find(book => book.id === Number(bookId))
    if(!book){
        next(createError(404, 'Book by requested id not found'))
    }
    next()
}

const validateReviewId = (req, res, next) => {
    const {id, bookId} = req.params
    const book = books.find(book => book.id === Number(bookId))
    const review = book.reviews.find(review => review.id === Number(id))
    if(!review){
        next(createError(404, 'Review by requested id not found'))
    }
    next()
}

module.exports = {validateBookId, validateReviewBody, validateReviewId}
