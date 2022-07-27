const db = require("../models");
const Exemplar = db.exemplar;

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

//   Exemplar.findAll({
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

exports.cadastrar_exemplar = async (req, res) => {
  if (!req.body.isbn) {
    res.status(400).send({
      message: req.body
    });
    return;
  }

  await Exemplar.create({
      numero: req.body.numero,
      pub_isbn: req.body.isbn,
      preco: req.body.preco
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