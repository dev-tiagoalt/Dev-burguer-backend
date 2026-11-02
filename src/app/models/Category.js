import { DataTypes, Model } from 'sequelize'

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        path: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'categories',
        underscored: true,
      },
    )
    return this
  }
}

export default Category
