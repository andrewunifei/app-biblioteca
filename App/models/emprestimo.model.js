const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Emprestimo extends Model{
    static associate(models){}
  }

  Emprestimo.init(
    {
        codigo: Sequelize.INTEGER,
        nro_exemplar: Sequelize.INTEGER,
        pub_isbn: Sequelize.STRING,
        cod_assoc: Sequelize.INTEGER,
        data_emp: Sequelize.DATE,
        data_devol: Sequelize.DATE
    },
    {
      sequelize,
      modelName: 'Emprestimo',
      tableName: 'emprestimo',
      underscore: true,
      timestamps: false
    },
  )
  Emprestimo.removeAttribute('id');
  
  return Emprestimo
}

