const { sequelize } = require("../models");
const db = require("../models");
const Emprestimo = db.emprestimo;
const Associado = db.associado;
const Op = db.Sequelize.Op;

function addDias(data, dias){
  let resultado = new Date(data);
  resultado.setDate(resultado.getDate() + dias);

  return resultado;
}

function calcular_atraso(data_devol){
  let today = new Date();
  let data_ = new Date(data_devol)

  if (today <= data_){
    return 0;
  }
  else {
    let diferenca = today - data_
    return Math.floor(diferenca/(1000 * 3600 * 24));
  }
}

exports.consultar_emp = async (req, res) => {
  await sequelize.query(
    "SELECT pub_isbn, cod_assoc, data_devol FROM emprestimo"
  )
  .then(async data => {
      let emprestimos = [];

      for(let i = 0; i < data[0].length; i++){
        emprestimos.push({
          pub_isbn: data[0][i].pub_isbn,
          data_devol: data[0][i].data_devol,
          dias: calcular_atraso(data[0][i].data_devol)
        })
      }
      res.status(200).send(emprestimos)
    }
  )
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Erro"
    });
  });
}

exports.relatorio = async (req, res) => {
  await sequelize.query(
    "SELECT pub_isbn, cod_assoc, data_devol FROM emprestimo"
  )
  .then(async data => {
      let atrasados = [];

      for(let i = 0; i < data[0].length; i++){
        if(calcular_atraso(data[0][i].data_devol)){
          atrasados.push(data[0][i])
        }
      }
      res.status(200).send(atrasados)
    }
  )
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Erro"
    });
  });
}

exports.retirar = async (req, res) => {
  if (!req.body.cod_assoc) {
    res.status(400).send({
      message: req.body
    });
    return;
  }

  await sequelize.query(
    "UPDATE reserva SET status = 'Anulado'\
     WHERE codigo_assoc = \'" + req.body.cod_assoc+ "\'"
  )
  .then(async data => {
      res.status(200).send({message:"Ok"})
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Erro"
    });
  });
}

exports.devolucao = async (req, res) => {
  let multa;

  if (!req.body.pub_isbn) {
    res.status(400).send({
      message: req.body
    });
    return;
  }

  await sequelize.query(
    "select * from emprestimo where pub_isbn = \'" + req.body.pub_isbn + "\'\
    and nro_exemplar = \'" + req.body.nro_exemplar + "\'"
  )
  .then(async data => {
      multa = calcular_atraso(data[0][0].data_devol)

      await sequelize.query(
        "UPDATE reserva SET status = 'Avisado'\
         WHERE codigo_assoc = \'" + req.body.cod_assoc+ "\' and pub_isbn = \'" + req.body.pub_isbn + "\';\
         DELETE FROM emprestimo WHERE pub_isbn = \'" + req.body.pub_isbn + "\'\
         AND nro_exemplar = \'" + req.body.nro_exemplar + "\'"
      )
      .then(res.status(200).send({multa}))
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro"
        });
      });
    }
  )
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Erro"
    });
  });
}


exports.renovacao = async (req, res) => {
  let flag = true;

  await sequelize.query(
    "select * from emprestimo where pub_isbn = \'" + req.body.pub_isbn + "\'\
    and nro_exemplar = \'" + req.body.nro_exemplar + "\'"
  )
  .then(data => {
    if(data[0].length > 0){
      if(req.body.data_emp != data[0][0].data_devol){
        res.status(200).send({flag:false, message: "Não foi possível realizar a renovação: hoje não é a data de devolução do exemplar"})

        flag = false;
      }
    }
    else{
      res.status(200).send({flag: false, message: "Erro. Exemplar não foi emprestado."})

      flag = false;
    }
    }
  )
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Erro"
    });
  })

  if(flag){
    await sequelize.query(
      "select count(*) from reserva where pub_isbn = \'" + req.body.pub_isbn + "\'"
    )
    .then(data => {
      if(data[0][0].count > 0){
        res.status(200).send({flag: false, message: "Exemplar na fila de reserva."})

        flag = false;
      }
    })
  }

  if(flag){
    await Associado.findAll({
      attributes: ['status'],
      where: {
        codigo: {
          [Op.eq]: req.body.cod_assoc
        }
      }
    })
    .then(async data => {
      let calc_data;
      let data_array = req.body.data_emp.split('-');

      let hold_data = new Date(data_array[0], data_array[1] - 1, data_array[2]) ;

      if(data[0].dataValues.status == 'Grad'){
        calc_data = addDias(hold_data, 7);
        calc_data = calc_data.toISOString().slice(0,10);
      }
      else if(data[0].dataValues.status == 'Posgrad'){
        calc_data = addDias(hold_data, 10);
        calc_data = calc_data.toISOString().slice(0,10);
      }
      else{
        calc_data = addDias(hold_data, 14);
        calc_data = calc_data.toISOString().slice(0,10);
      }

      await Emprestimo.create({
        nro_exemplar: req.body.nro_exemplar,
        pub_isbn: req.body.pub_isbn,
        cod_assoc: req.body.cod_assoc,
        data_emp: req.body.data_emp,
        data_devol: calc_data
      })
      .then(data => {
        res.status(200).send({flag:true, data})
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro"
        })
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro"
      });
    })
  }
}

exports.cadastrar_emprest = async (req, res) => {
  if (!req.body.cod_assoc) {
    res.status(400).send({
      message: req.body
    });
    return;
  }


  await sequelize.query(
    "SELECT COUNT(exemplar.numero) FROM exemplar LEFT JOIN emprestimo\
    ON (emprestimo.pub_isbn = exemplar.pub_isbn AND emprestimo.nro_exemplar = exemplar.numero)\
    WHERE (emprestimo.pub_isbn is null AND emprestimo.nro_exemplar is null\
    AND exemplar.pub_isbn = \'" + req.body.pub_isbn + "\')"
  )
  .then(async data => {
    let n_records = data[0][0].count;
    let flag;

    if(n_records > 0){
      await sequelize.query(
        "SELECT count(*) FROM reserva WHERE pub_isbn = \'" + req.body.pub_isbn + "\'"
      )
      .then(async data => {
        if(data[0][0].count > 0){
          await sequelize.query(
            "SELECT * FROM reserva\
            WHERE pub_isbn = \'" + req.body.pub_isbn + "\'\
            AND status = \'Iniciado\'\
            ORDER BY codigo ASC LIMIT \'" + n_records + "\'"
          )
          .then(data => {
            if(data[0].length > 0){
              if(data[0][0].codigo_assoc == req.body.cod_assoc){
                flag = true
              }
              else{
                res.status(200).send({flag:false, message: "Não é a vez do associado na fila de reserva", data})
              }
            }
            else{
              flag = true
            }
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Erro"
            });
          });
        }
        else{
          flag = true
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro"
        });
      });
    }
    else{
      res.status(200).send({flag:false, message:"Nenhum exemplar disponível, é necessário realizar reserva."})
    }

    if(flag == true){
      await sequelize.query(
        "UPDATE reserva\
        SET status = 'Atendido'\
        WHERE codigo_assoc = \'" + req.body.cod_assoc + "\';"
      )
      
      await Associado.findAll({
        attributes: ['status'],
        where: {
          codigo: {
            [Op.eq]: req.body.cod_assoc
          }
        }
      })
      .then(async data => {
        let calc_data;
        let data_array = req.body.data_emp.split('-');

        let hold_data = new Date(data_array[0], data_array[1] - 1, data_array[2]) ;

        if(data[0].dataValues.status == 'Grad'){
          calc_data = addDias(hold_data, 7);
          calc_data = calc_data.toISOString().slice(0,10);
        }
        else if(data[0].dataValues.status == 'Posgrad'){
          calc_data = addDias(hold_data, 10);
          calc_data = calc_data.toISOString().slice(0,10);
        }
        else{
          calc_data = addDias(hold_data, 14);
          calc_data = calc_data.toISOString().slice(0,10);
        }

        await Emprestimo.create({
          nro_exemplar: req.body.nro_exemplar,
          pub_isbn: req.body.pub_isbn,
          cod_assoc: req.body.cod_assoc,
          data_emp: req.body.data_emp,
          data_devol: calc_data
        })
        .then(data => {
          res.status(200).send({flag:true, data})
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Erro"
          })
        })
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro"
        });
      });
    }
  })
}
