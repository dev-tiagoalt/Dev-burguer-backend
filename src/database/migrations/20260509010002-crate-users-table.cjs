'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cria tabela users
    await queryInterface.createTable('users', {
      // ID UUID
      id: {
        type: Sequelize.UUID,

        // Gera UUID automático no postgres
        defaultValue: Sequelize.literal('uuid_generate_v4()'),

        allowNull: false,

        primaryKey: true,
      },

      // Nome
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // Email
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      // Senha
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // Admin
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      // Data criação
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      // Data atualização
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface) {
    // Remove tabela
    await queryInterface.dropTable('users')
  },
}
