import express from 'express'
import joi from 'joi'
import { Book } from '../models/tablefile.js'

const router = express.Router()

const schema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  pages: joi.number().optional(),
  tags: joi.array().items(joi.string()).optional(),
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    res.status(400).send('Invalid ID format')
    return
  }
  const book = await Book.findOne({ where: { id: id } })
  if (!book) {
    res.status(404).send('Book was not found')
    return
  }
  res.send(book)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    res.status(404).send('Book was not found')
    return
  }
  const book = await Book.findOne({ where: { id: id } })
  if (!book) {
    res.status(404).send('Book was not found')
    return
  }
  Book.destroy({ where: { id: id } })
  res.send(book)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    res.status(400).send('Invalid ID format')
    return
  }
  const result = schema.validate(req.body)
  if (result.error) {
    res.status(405).send('Added book is not valid')
    return
  }
  const book = await Book.findOne({ where: { id: id } })
  if (!book) {
    res.status(404).send('Book was not found')
    return
  }
  const updatedBook = await Book.update(req.body, { where: { id: id } })
  res.send(updatedBook)
})

export default router