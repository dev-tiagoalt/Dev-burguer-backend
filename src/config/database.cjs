module.exports = {
  // Banco utilizado
  dialect: 'postgres',

  // Local do banco
  host: 'localhost',

  // Porta padrão postgres
  port: '5432',

  // Usuário do banco
  username: 'admin',

  // Senha do banco
  password: '123456',

  // Nome do banco
  database: 'dev-burguer-db',

  // Configurações automáticas
  define: {
    // Cria created_at e updated_at
    timestamps: true,

    // Converte camelCase para snake_case
    underscored: true,

    // Aplica em todas tabelas
    underscoredAll: true,
  },
}
