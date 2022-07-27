const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Exemplar extends Model{
    static associate(models){}
  }

  Exemplar.init(
    {
      numero: Sequelize.INTEGER,
      pub_isbn: Sequelize.STRING,
      preco: Sequelize.FLOAT,
    },
    {
      sequelize,
      modelName: 'Exemplar',
      tableName: 'exemplar',
      underscore: true,
      timestamps: false
    },
  )
  Exemplar.removeAttribute('id');
  
  return Exemplar
}

