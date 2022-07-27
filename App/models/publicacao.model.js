const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Publicacao extends Model{
    static associate(models){}
  }

  Publicacao.init(
    {
      isbn: Sequelize.STRING,
      titulo: Sequelize.STRING,
      autor: Sequelize.STRING,
      editora: Sequelize.STRING
    },
    {
      sequelize,
      modelName: 'Publicacao',
      tableName: 'publicacao',
      underscore: true,
      timestamps: false
    },
  )
  Publicacao.removeAttribute('id');
  
  return Publicacao
}

