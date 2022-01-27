import express from 'express'
import joi from 'joi'
import library from '../dataLibrary.js'

const router = express.Router()

const schema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    pages: joi.number().optional(),
    tags: joi.array().items(joi.string()).optional(),
})

const newBook = (body) => {
    const newBookPush = {
      ...body,
      id: library.length,
    }
    library.push(newBookPush)
    return newBookPush
}

router.get('/', (req, res) => {
    res.send(library)
})
  
router.post('/', (req, res) => {
    const result = schema.validate(req.body)
    if (result.error) {
      res.status(405).send('New book not valid')
    } else {
      const object = newObject(req.body)
      res.send(object)
    }
})
  
export default router