import express from 'express'
import joi from 'joi'
import { Book, Tag } from '../models/tablefile.js'

const router = express.Router()

const schema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    pages: joi.number().optional(),
    tags: joi.array().items(joi.string()).optional(),
})

router.get('/', async (req, res) => {
  const books = await Book.findAll({ include: Tag }).catch((error) => {
    console.log(error)
  })
  if (!books) {
    res.send('Books were not found')
    return
  }
  console.log(books)
  res.send(books)
})
  
router.post('/', async (req, res) => {
  const result = schema.validate(req.body)
  if (result.error) {
    res.status(405).send('Added book is not valid')
    return
  }
  const book = await Book.create(req.body).catch((error) => {
    console.log(error)
  })
  const bookTags = req.body.tags
  const tags = await Tag.bulkCreate([bookTags]).catch((error) => {
    console.log(error)
  })

  await book.addTag(tags, { through: 'book_id' })

  res.send(book)
  console.log(book)
})

export default router