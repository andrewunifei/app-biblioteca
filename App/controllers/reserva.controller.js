const db = require("../models");
const Reserva = db.reserva;

const Op = db.Sequelize.Op;

exports.consultar = (req, res) => {
    return
//   if (!req.body.codigo) {
//     res.status(400).send({
//       message: req.body
//     });
//     return;
//   }

//   console.log(req.body)

//   codigo = parseInt(req.body.codigo)
//   senha = req.body.senha

//   Reserva.findAll({
//     attributes: ['codigo', 'senha', 'status', 'nome'],
//     where: {
//       codigo: {
//         [Op.eq]: codigo
//       },
//       senha: {
//         [Op.eq]: senha
//       }
//     }
//   })
//   .then(data => {
//     if(data.length == 0){
//       res.status(400).send({
//         message: "Falha na autenticação"
//       })
//     }
//     else{
//       console.log(data)
//       res.status(200).send(data)
//     }
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Erro"
//     });
//   });

}

exports.cadastrar_reserva = async (req, res) => {
  if (!req.body.pub_isbn) {
    res.status(400).send({
      message: req.body
    });
    return;
  }

  await Reserva.create({
      pub_isbn: req.body.pub_isbn,
      codigo_assoc: req.body.cod_assoc,
      data: req.body.data,
      status: req.body.status
    })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro"
      })
    })
}