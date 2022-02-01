import { Model, DataTypes } from 'sequelize'

export default (sequelize) => {
  class Book extends Model {}

  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { sequelize, modelName: "Book" })

  return Book
}