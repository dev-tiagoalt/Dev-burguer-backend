import Sequelize, { Model } from 'sequelize'

// Cria model User
class User extends Model {
  // Método responsável por iniciar o model
  static init(sequelize) {
    return Model.init(
      {
        // ID automático UUID
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },

        // Nome do usuário
        name: Sequelize.STRING,

        // Email
        email: Sequelize.STRING,

        // Senha criptografada
        password_hash: Sequelize.STRING,

        // Admin true ou false
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'users',
      },
    )
  }
}

// Exporta model
export default User
