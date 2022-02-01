import { Model, DataTypes } from 'sequelize'

export default (sequelize) => {
  class Author extends Model {}

  Author.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize, modelName: "Author"} )

  return Author
}