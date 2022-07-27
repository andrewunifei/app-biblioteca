CREATE TYPE tipos AS ENUM ('gerente','funcionario');
CREATE TABLE IF NOT EXISTS FUNCIONARIO (
	codigo serial,
	   senha varchar(10) NOT NULL,
    nome varchar(35) NOT NULL,
    funcao tipos NOT NULL,
    email varchar(20) NOT NULL,
    PRIMARY KEY (codigo)
);

insert into funcionario(senha, nome, funcao, email)
values ('123', 'Admin', 'gerente', 'admin@email.com');

-------------------------------------------

CREATE TYPE formacao AS ENUM ('Grad', 'Posgrad', 'Prof');
CREATE TABLE IF NOT EXISTS ASSOCIADO (
 	codigo serial,
 	senha varchar(10) NOT NULL,
     nome varchar(35) NOT NULL,
     endereco varchar(45) NOT NULL,
	    email varchar(20) NOT NULL,
     status formacao NOT NULL,
	PRIMARY KEY (codigo)
);

insert into associado(senha, nome, endereco, email, status)
values ('123', 'Andrew', 'Itajubá', 'andrew@email.com', 'Grad');

-------------------------------------------

CREATE TABLE IF NOT EXISTS PUBLICACAO (
  	isbn varchar(12) NOT NULL,
  	titulo varchar(40) NOT NULL,
   autor varchar(35) NOT NULL,
   editora varchar(30) NOT NULL,
 	PRIMARY KEY (isbn)
);

-------------------------------------------

CREATE TABLE IF NOT EXISTS EXEMPLAR (
   numero integer NOT NULL,
   pub_isbn varchar(12) references publicacao(isbn) NOT NULL,
   preco float NOT NULL,
   PRIMARY KEY (numero, pub_isbn)
);

-------------------------------------------

CREATE TYPE statuss AS ENUM ('Iniciado', 'Atendido', 'Avisado', 'Anulado');
CREATE TABLE IF NOT EXISTS RESERVA (
  	codigo serial NOT NULL,
  	pub_isbn varchar(12) references publicacao(isbn) NOT NULL,
   codigo_assoc int references associado(codigo) NOT NULL,
   data date NOT NULL,
	status statuss NOT NULL,
 	PRIMARY KEY (codigo)
);

-------------------------------------------

CREATE TABLE IF NOT EXISTS EMPRESTIMO (
   codigo serial NOT NULL,
   nro_exemplar int NOT NULL,
   pub_isbn varchar(12) not null,
   cod_assoc int references associado(codigo) NOT NULL,
   data_emp date NOT NULL,
   data_devol date DEFAULT NULL,
   PRIMARY KEY (codigo)
)

-------------------------------------------

SELECT * FROM public.reserva
ORDER BY codigo ASC

insert into reserva (pub_isbn, codigo_assoc, data, status)
values (2, 11, '2022-07-22', 'Iniciado')

SELECT codigo_assoc FROM reserva
WHERE pub_isbn = '2'
ORDER BY codigo ASC LIMIT '3'

UPDATE reserva
SET status = 'Atendido'
WHERE codigo_assoc = 9;

delete from emprestimo where pub_isbn = '1' and nro_exemplar = 1;