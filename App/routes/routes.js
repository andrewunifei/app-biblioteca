const express = require("express")
const auth = require("../controllers/auth.controller.js");
const associado = require("../controllers/associado.controller.js");
const publicacao = require("../controllers/publicacao.controller.js");
const exemplar = require("../controllers/exemplar.controller.js");
const reserva = require("../controllers/reserva.controller.js");
const emprestimo = require("../controllers/emprestimo.controller.js");

const router = express.Router();

// Funcionário
router.post("/", auth.login);
router.post("/cadastrar_func", auth.cadastrar_func);

// Associado
router.post("/associado", associado.login);
router.post("/cadastrar-assoc", associado.cadastrar_assoc);

// Publicação
router.post("/cadastrar-pub", publicacao.cadastrar_pub);
router.post("/consultar-pub", publicacao.consultar_pub);

// Exemplar
router.post("/cadastrar-exemplar", exemplar.cadastrar_exemplar);

// Reserva
router.post("/cadastrar-reserva", reserva.cadastrar_reserva);

// Empréstimo
router.post("/cadastrar-emp", emprestimo.cadastrar_emprest);
router.post("/devolucao", emprestimo.devolucao);
router.post("/retirar", emprestimo.retirar)
router.post("/renovacao", emprestimo.renovacao)
router.get("/relatorio", emprestimo.relatorio)
router.get("/consultar-emp", emprestimo.consultar_emp)

module.exports = router