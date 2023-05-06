const createError = require('http-errors')
const {books} = require('../data')

const validateBookBody = (req, res, next) => {
    if(!req.body.id){
        next(createError(400, 'Book id not provided'))
    }
    if(!req.body.title){
        next(createError(400, 'Book title not provided'))
    }
    next()
}


const validateBookTitle = (req, res, next) => {
    if(!req.body.title){
        next(createError(400, 'Book title not provided'))
    }
    next()
}

const validateBookId = (req, res, next) => {
    const {id} = req.params
    const book = books.find(book => book.id === Number(id))
    if(!book){
        next(createError(404, 'Book by requested id not found'))
    }
    next()
}

module.exports = {validateBookId, validateBookBody, validateBookTitle}
