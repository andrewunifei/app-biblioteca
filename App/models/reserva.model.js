const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Reserva extends Model{
    static associate(models){}
  }

  Reserva.init(
    {
      pub_isbn: Sequelize.STRING,
      codigo_assoc: Sequelize.INTEGER,
      data: Sequelize.DATE,
      status: Sequelize.STRING
    },
    {
      sequelize,
      modelName: 'Reserva',
      tableName: 'reserva',
      underscore: true,
      timestamps: false
    },
  )
  Reserva.removeAttribute('id');
  
  return Reserva
}

