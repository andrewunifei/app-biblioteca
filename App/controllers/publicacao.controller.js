const { sequelize } = require("../models");
const db = require("../models");
const Publicacao = db.publicacao;

exports.consultar_pub = async (req, res) => {
  let hold_isbn;

  console.log(req.body)

  if (!req.body.isbn && !req.body.titulo) {
    res.status(400).send({
      message: req.body
    });
    return;
  }

  if(!req.body.isbn){
    await sequelize.query(
      "SELECT isbn FROM publicacao WHERE publicacao.titulo = \'" + req.body.titulo + "\'"
    )
    .then(data => {
        console.log(data[0])
        hold_isbn = data[0][0].isbn
      }
    )
  }
  else{
    hold_isbn = req.body.isbn;
  }

  await sequelize.query(
    "SELECT exemplar.numero, exemplar.pub_isbn, exemplar.preco FROM exemplar LEFT JOIN emprestimo\
    ON (emprestimo.pub_isbn = exemplar.pub_isbn AND emprestimo.nro_exemplar = exemplar.numero)\
    WHERE (emprestimo.pub_isbn is null AND emprestimo.nro_exemplar is null\
    AND exemplar.pub_isbn = \'" + hold_isbn + "\')"
  )
  .then(async data => {
    disponiveis = data[0]

    await sequelize.query(
      "SELECT exemplar.numero, exemplar.pub_isbn, exemplar.preco FROM exemplar JOIN emprestimo\
      ON (emprestimo.pub_isbn = exemplar.pub_isbn AND emprestimo.nro_exemplar = exemplar.numero)\
      WHERE exemplar.pub_isbn = \'" + hold_isbn + "\'"
    ).then(data => {
      res.status(200).send({disponiveis, indisponiveis:data[0]})
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro"
      });
    })
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Erro"
    });
  })
}

exports.cadastrar_pub = async (req, res) => {
  if (!req.body.isbn) {
    res.status(400).send({
      message: req.body
    });
    return;
  }

  await Publicacao.create({
      isbn: req.body.isbn,
      titulo: req.body.titulo,
      autor: req.body.autor,
      editora: req.body.editora
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