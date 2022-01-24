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

/*function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    pages: Joi.number().optional(),
    tags: Joi.array().items(Joi.string()).optional()
  })
  const result = schema.validate(req.body)
  return result = schema.validate(req.body)
} */

router.get('/book', (req, res) => {
  res.send(library)
})

router.get('/book/:id', (req, res) => {
  const book = library.find(b => b.id === parseInt(req.params.id))
  if(!book) return res.status(404).send('Book was not found')
  res.send(book)
})

router.post('/book', (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    pages: Joi.number().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    });
  
    const result = schema.validate(req.body)
  
    if (result.error) {
      res.status(405).send("New book was not validated")
    } else {
      index = library.length
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        tags: req.body.tags,
        id: index
      }
    library.push(newBook)
    res.send("Book has been added")
  }
})

router.put('/book/:id', (req, res) => {
  //id check
  const parsedId = parseId(req.params.id)
  if (isNaN(parsedId)) {
    res.status(400).send("Wrong ID format")
  }
  
  //look up the book
  const book = library.find(b => b.id === parseInt(req.params.id))
  if(!book) return res.status(404).send('Book was not found')
  
  //validation
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    pages: Joi.number().required(),
    tags: Joi.array().items(Joi.string()).optional(),
  })
  
  const result = schema.validate(req.body)
  
  if (result.error) {
    res.status(405).send("New book was not validated")
  } else {
  //update
    library[parsedId] = {
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      tags: req.body.tags,
      id: parsedId
    }
    res.send(library)
  }
})

router.delete('/book/:id', (req, res) => {
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
const parseId = (id) => parseInt(id)