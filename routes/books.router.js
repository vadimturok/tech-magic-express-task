const express = require('express')
const {books} = require('../data')
const {validateBookId, validateBookBody, validateBookTitle} = require('../middlewares/books.middleware')

const router = express.Router()

router.get('/', (req, res) => {
    res.json(books)
})

router.get('/:id', validateBookId, (req, res) => {
    const {id} = req.params
    const book = books.find(book => book.id === Number(id))
    res.json(book)
})


router.post('/',  validateBookBody, (req, res) => {
    const book = req.body
    const newBook = {
        id: book.id,
        title: book.title,
        reviews: []
    }
    books.push(newBook)
    res.status(201).json(newBook)
})

router.put('/:id',  validateBookTitle, validateBookId, (req, res) => {
    const {id} = req.params
    const {title} = req.body
    const bookIndex = books.findIndex(book => book.id === Number(id))
    books[bookIndex] = {...books[bookIndex], title: title}
    res.json(books[bookIndex])
})

module.exports = router


