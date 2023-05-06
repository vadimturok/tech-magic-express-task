const express = require('express')

const booksRouter = require('./routes/books.router')
const reviewsRouter = require('./routes/reviews.router')

const app = express()
const PORT = 3000


app.use(express.json())
app.use('/books', booksRouter)
app.use('/reviews', reviewsRouter)

app.use((err, req, res, next) => {
    res.send(err)
})


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))