import { Model, DataTypes } from 'sequelize'

export default (sequelize) => {
  class Tag extends Model {}

  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { sequelize, modelName: "Tag" })

  return Tag;
}