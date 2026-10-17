import { DataTypes, Model, Sequelize } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
    Model.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        category: DataTypes.STRING,
        path: DataTypes.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-file/${this.path}`
          },
        },
      },
      {
        sequelize,
        tableName: 'products',
      },
    )
    return Product
  }
}

export default Product
