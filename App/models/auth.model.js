const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Funcionario extends Model{
    static associate(models){}
  }

  Funcionario.init(
    {
      codigo: Sequelize.INTEGER,
      senha: Sequelize.STRING,
      nome: Sequelize.STRING,
      funcao: Sequelize.STRING,
      email: Sequelize.STRING
    },
    {
      sequelize,
      modelName: 'Funcionario',
      tableName: 'funcionario',
      underscore: true,
      timestamps: false
    },
  )
  Funcionario.removeAttribute('id');
  
  return Funcionario
}

