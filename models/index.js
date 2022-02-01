import { Sequelize } from 'sequelize'
import book from './book'
import author from './author'
import tag from './tag'

const sequelize = new Sequelize('sqlite::memory:')
const database = {}

database.sequelize = sequelize

database.books = book(sequelize)

database.authors = author(sequelize)
database.books.hasOne(database.authors)
database.authors.belongsTo(database.books, {
  foreignKey: {
    allowNull: false
  }
})

database.tags = tag(sequelize)
database.books.belongsToMany(database.tags, { through: 'BookTags', as: 'tags'} )
database.tags.belongsToMany(database.books, { through: 'BookTags', as: 'books'} )

export default database;