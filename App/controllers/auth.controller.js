const { USER } = require("../config/db.config");
const db = require("../models");
const Funcionario = db.funcionario;

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

  Funcionario.findAll({
    attributes: ['codigo', 'senha', 'funcao', 'nome'],
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
      console.log("data::::" + data)
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

exports.cadastrar_func = async (req, res) => {
  if (!req.body.senha) {
    res.status(400).send({
      message: req.body
    });
    return;
  }

  await Funcionario.create({
    senha: req.body.senha,
    nome: req.body.nome,
    funcao: req.body.funcao,
    email: req.body.email
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