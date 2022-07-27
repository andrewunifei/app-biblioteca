const db = require("../models");
const Associado = db.associado;

const Op = db.Sequelize.Op;

exports.login = (req, res) => {
  if (!req.body.codigo) {
    res.status(400).send({
      message: req.body
    });
    return;
  }

  console.log(req.body)

  codigo = parseInt(req.body.codigo)
  senha = req.body.senha

  Associado.findAll({
    attributes: ['codigo', 'senha', 'status', 'nome'],
    where: {
      codigo: {
        [Op.eq]: codigo
      },
      senha: {
        [Op.eq]: senha
      }
    }
  })
  .then(data => {
    if(data.length == 0){
      res.status(400).send({
        message: "Falha na autenticação"
      })
    }
    else{
      console.log(data)
      res.status(200).send(data)
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Erro"
    });
  });

}

exports.cadastrar_assoc = async (req, res) => {
  if (!req.body.senha) {
    res.status(400).send({
      message: req.body
    });
    return;
  }

  await Associado.create({
      senha: req.body.senha,
      nome: req.body.nome,
      endereco: req.body.endereco,
      email: req.body.email,
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