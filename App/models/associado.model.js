const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Associado extends Model{
    static associate(models){}
  }

  Associado.init(
    {
      codigo: Sequelize.INTEGER,
      senha: Sequelize.STRING,
      nome: Sequelize.STRING,
      endereco: Sequelize.STRING,
      email: Sequelize.STRING,
      status: Sequelize.STRING
    },
    {
      sequelize,
      modelName: 'Associado',
      tableName: 'associado',
      underscore: true,
      timestamps: false
    },
  )
  Associado.removeAttribute('id');
  
  return Associado
}

