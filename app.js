import express from 'express'
import bookRoutes from './routes/book.js'
import idRoutes from './routes/id.js'
import { sequelize } from './models/tablefile.js'

sequelize.sync()

const app = express()

app.use(express.json())

app.use('/book', bookRoutes)
app.use('/book', idRoutes)

app.get('/', (req, res) => {
  res.send('Homepage')
})

const port = process.env.PORT || 3007
app.listen(port, ()=> console.log(`Listening on port ${port}...`))