const library = [
    {
    "title": "Robinson Crusoe",
    "author": "Daniel Defoe",
    "pages": 300,
    "tags": [
      "adventure",
      "history"
    ],
    "id": 0
  },
  {
    "title": "The Unbearable Lightness of Being",
    "author": "Milan Kundera",
    "pages": 250,
    "tags": [
      "philosophical",
      "novel"
    ],
    "id": 1
  },
{
  "title": "Nausea",
  "author": "Jean-Paul Sartre",
  "pages": 120,
  "tags": [
    "philosophical",
    "existentialism",
    "novel"
  ],
  "id": 2
},
]

const express = require("express")
const Joi = require('joi')
const app = express()
const router = express.Router()

function validateBook(book) {
  const schema = {
    title: Joi.string().required(),
    author: Joi.string().required(),
    pages: Joi.number().optional(),
    tags: Joi.array().items(Joi.string()).optional()
  }
  return Joi.validate(book, schema)
}

router.get('/library', (req, res) => { 
  res.send(library)
})

router.get('/library/:id', (req, res) => {
  const book = library.find(b => b.id === parseInt(req.params.id))
  if(!book) return res.status(404).send('Book was not found')
  res.send(book)
})

router.post('/library', (req, res) => {
  const { error } = validateBook(req.body)
  if(error) return res.status(400).send(error.details.message)

  const book = {
    id: library.length + 1,
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    tags: req.body.tags
  }
  library.push(book)
  res.send(book)
})

router.put('/library/:id', (req, res) => {
  //look up the book
  const book = library.find(b => b.id === parseInt(req.params.id))
  if(!book) return res.status(404).send('Book was not found')
  
  //validation
  const { error } = validateBook(req.body)
  if(error) return res.status(400).send(error.details.message)

  //update the library
  book.title = req.body.title
  book.author = req.body.author
  book.pages = req.body.pages
  book.tags = req.body.tags
  res.send(book)
})

router.delete('/library/:id', (req, res) => {
  //look up the book
  const book = library.find(b => b.id === parseInt(req.params.id))
  if(!book) return res.status(404).send('Book was not found')

  //delete
  const index = library.indexOf(book)
  library.slice(index, 1)

  //return the same book
  res.send(book)
})

app.use(express.json())
app.use(router)

const port = process.env.PORT || 3007
app.listen(port, ()=> console.log(`Listening on port ${port}...`))