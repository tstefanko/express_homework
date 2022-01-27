import express from 'express'
import joi from 'joi'
import library from '../dataLibrary.js'

const router = express.Router()

const parseId = (id) => parseInt(id)

const schema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  pages: joi.number().optional(),
  tags: joi.array().items(joi.string()).optional(),
})

router.get('/:id', (req, res) => {
    const book = library.find(b => b.id === parseInt(req.params.id))
    if(!book) return res.status(404).send('Book was not found')
    res.send(book)
})

router.delete('/:id', (req, res) => {
    //look up the book
    const book = library.find(b => b.id === parseInt(req.params.id))
    if(!book) return res.status(404).send('Book was not found')
  
    //delete
    const index = library.indexOf(book)
    library.slice(index, 1)
  
    //return the same book
    res.send(book)
})

router.put('/:id', (req, res) => {
    //id check
    const parsedId = parseId(req.params.id)
    if (isNaN(parsedId)) {
      res.status(400).send('Wrong ID format')
    }
    
    //look up the book
    const book = library.find(b => b.id === parseInt(req.params.id))
    if(!book) return res.status(404).send('Book was not found')
    
    const result = schema.validate(req.body)
    
    if (result.error) {
      res.status(405).send('New book was not validated')
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

export default router