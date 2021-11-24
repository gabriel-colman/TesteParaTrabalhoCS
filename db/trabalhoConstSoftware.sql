-- TRABALHO CONSTRUÇÃO DE SOFTWARE
-- RODOLFO SANTOS, FÁBIO YUDI, GABRIEL COLMAN


--  CREATE SCHEMA IMOBILIARIACS;
 SET SEARCH_PATH TO IMOBILIARIACS;
 
 DROP TABLE IF EXISTS PESSOA CASCADE; 
 DROP TABLE IF EXISTS CARGO CASCADE;
 DROP TABLE IF EXISTS ENDERECO CASCADE;
 DROP TABLE IF EXISTS FUNCIONARIO CASCADE;
 DROP TABLE IF EXISTS IMOVEL_PROPRIETARIO CASCADE;
 DROP TABLE IF EXISTS IMOVEL_GERAL CASCADE;
 DROP TABLE IF EXISTS CONTRATO CASCADE;
 DROP TABLE IF EXISTS PAGAMENTO CASCADE;
 
 CREATE TABLE PESSOA (
	 CPF VARCHAR(11) NOT NULL UNIQUE,
	 ENDERECO VARCHAR(20),
	 NOME VARCHAR(255),
	 CELULAR VARCHAR(11),
	 TELEFONE VARCHAR(11),
	 EMAIL VARCHAR(100),
	 SEXO VARCHAR(14),
	 ESTADO_CIVIL VARCHAR(14),
	 PROFISSAO VARCHAR(255),
	 CPF_INDICACAO VARCHAR(11),
	 CPF_FIADOR VARCHAR(11),
	 CPF_PROPRIETARIO VARCHAR(11) UNIQUE,
	 PRIMARY KEY (CPF, CPF_PROPRIETARIO)
 );
 
 CREATE TABLE FUNCIONARIO (
 	 CPF_FUNCIONARIO VARCHAR(11) NOT NULL,
	 CARGO INTEGER,
	 DT_INGRESSO DATE,
	 SALARIO NUMERIC(10,2),
	 SENHA VARCHAR(255),
	 USUARIO VARCHAR(50),
	 PRIMARY KEY (CPF_FUNCIONARIO)
 );
 
 CREATE TABLE CARGO (
	 ID_CARGO INTEGER NOT NULL,
	 NOME VARCHAR(255),
	 SALARIO NUMERIC(10,2),
	 PRIMARY KEY (ID_CARGO)
 );
 
 CREATE TABLE ENDERECO (
	 CEP VARCHAR (20) NOT NULL,
	 RUA VARCHAR(255),
	 BAIRRO VARCHAR(255),
	 NUMERO VARCHAR(255),
	 CIDADE VARCHAR(255),
	 ESTADO VARCHAR(255),
	 PRIMARY KEY (CEP)	 
 );
 
 CREATE TABLE IMOVEL_GERAL (
	 ID_IMOVEL_GERAL INTEGER NOT NULL,
	 ENDERECO VARCHAR(20),
	 VENDA BOOLEAN,
	 LOCACAO BOOLEAN,
	 STATUS CHARACTER(1),
	 CATEGORIA CHARACTER(1),
	 AREA SMALLINT,
	 DT_REG_COMPRA DATE,
	 DT_REG_ALUGUEL DATE,
	 DT_CONSTRUCAO DATE,
	 VALOR_ALUGUEL NUMERIC(10,2),
	 VALOR_VENDA NUMERIC(10,2),
	 PRIMARY KEY (ID_IMOVEL_GERAL)
 );
 
 CREATE TABLE IMOVEL_PROPRIETARIO (
	 CPF_PROPRIETARIO VARCHAR(11) NOT NULL,
	 IMOVEL_GERAL INTEGER NOT NULL,
	 PRIMARY KEY (CPF_PROPRIETARIO, IMOVEL_GERAL)
 );
 
 CREATE TABLE CONTRATO (
 	 ID_CONTRATO INTEGER NOT NULL,
	 IMOVEL_GERAL INTEGER,
	 CPF_PROPRIETARIO VARCHAR(11),
	 CPF_CLIENTE VARCHAR(11),
	 PAGAMENTO INTEGER,
	 VALOR_FINAL_VENDA NUMERIC(10,2),
	 VALOR_FINAL_ALUGUEL NUMERIC(10,2),
	 VALOR_CONDOMINIO NUMERIC(10,2),
	 DT_VENDA DATE,
	 DT_ALUGUEL DATE,
	 PROCETAGEM DECIMAL(5,2),
	 PRIMARY KEY (ID_CONTRATO)
 );
 
 CREATE TABLE PAGAMENTO (
 	 ID_PAGAMENTO INTEGER NOT NULL,
	 NOME VARCHAR(255),
	 PRIMARY KEY (ID_PAGAMENTO)
 );
 
 CREATE TABLE SALA_COMERCIAL (
 	 ID_SALA_COMERCIAL INTEGER NOT NULL,
	 QTD_COMODOS SMALLINT,
	 QTD_BANHEIROS SMALLINT,
	 IMOVEL_GERAL INTEGER,
	 PRIMARY KEY (ID_SALA_COMERCIAL)
 );
 
 CREATE TABLE TERRENO (
 	 ID_TERRENO INTEGER,
	 NIVEL_TERRENO CHARACTER(1),
	 LARGURA DECIMAL(5,2),
	 COMPRIMENTO DECIMAL(5,2),
	 IMOVEL_GERAL INTEGER,
	 PRIMARY KEY (ID_TERRENO)
 );
 
 CREATE TABLE CASA_APARTAMENTO (
 	 ID_CASA_AP INTEGER,
	 IMOVEL_GERAL INTEGER,
	 DESCRICAO VARCHAR(255),
	 QTD_QUARTOS SMALLINT,
	 QTD_SUITES SMALLINT,
	 QTD_SALA_ESTAR SMALLINT,
	 QTD_SALA_JANTAR SMALLINT,
	 QTD_VAGAS_GARAGEM SMALLINT,
	 POSSUI_ARMARIO BOOLEAN,
	 PRIMARY KEY (ID_CASA_AP)
 );
 
 CREATE TABLE APARTAMENTO (
 	 NUMERO_AP VARCHAR(50),
	 CASA_AP INTEGER,
	 ANDAR SMALLINT,
	 VALOR_CONDOMINIO NUMERIC(10,2),
	 POSSUI_PORTARIA BOOLEAN,
	 PRIMARY KEY (NUMERO_AP)
 );
 
 CREATE TABLE FOTO (
 	 ID_FOTO INTEGER,
	 IMOVEL_GERAL INTEGER,
	 NOME_FOTO VARCHAR(255),
	 PRIMARY KEY (ID_FOTO)
 );
 
 CREATE TABLE HISTORICO (
 	 ID_HISTORICO INTEGER NOT NULL,
	 STATUS CHARACTER(1),
	 CATEGORIA CHARACTER(1),
	 VALOR_ALUGUEL NUMERIC(10,2),
	 VALOR_VENDA NUMERIC(10,2),
	 VALOR_FINAL_VENDA NUMERIC(10,2),
	 VALOR_FINAL_ALUGUEL NUMERIC(10,2),
	 VALOR_CONDOMINIO NUMERIC(10,2),
	 DT_REG_COMPRA DATE,
	 DT_REG_ALUGUEL DATE,
	 DT_VENDA DATE,
	 DT_ALUGUEL DATE,
	 QTD_QUARTOS SMALLINT,
	 QTD_SUITES SMALLINT,
	 QTD_SALAS_ESTAR SMALLINT,
	 QTD_SALAS_JANTAR SMALLINT,
	 QTD_VAGAS_GARAGEM SMALLINT,
	 POSSUI_ARMARIO BOOLEAN,
	 QTD_COMODOS SMALLINT,
	 QTD_BANHEIROS SMALLINT,
	 IMOVEL_GERAL INTEGER,
	 PRIMARY KEY (ID_HISTORICO)
 );
 
 
 
  -- TABELA PESSOA
 ALTER TABLE PESSOA ADD CONSTRAINT PROPRIETARIO FOREIGN KEY (CPF_PROPRIETARIO) REFERENCES PESSOA(CPF);
 ALTER TABLE PESSOA ADD CONSTRAINT INDICACAO FOREIGN KEY (CPF_INDICACAO) REFERENCES PESSOA(CPF);
 ALTER TABLE PESSOA ADD CONSTRAINT FIADOR FOREIGN KEY (CPF_FIADOR) REFERENCES PESSOA(CPF);
 ALTER TABLE PESSOA ADD CONSTRAINT ENDERECO FOREIGN KEY (ENDERECO) REFERENCES ENDERECO(CEP);
 
 -- TABELA FUNCIONARIO
 ALTER TABLE FUNCIONARIO ADD CONSTRAINT FUNCIONARIO FOREIGN KEY (CPF_FUNCIONARIO) REFERENCES PESSOA(CPF);
 ALTER TABLE FUNCIONARIO ADD CONSTRAINT CARGO FOREIGN KEY (CARGO) REFERENCES CARGO(ID_CARGO);
 
 -- TABELA IMOVEL GERAL
 ALTER TABLE IMOVEL_GERAL ADD CONSTRAINT ENDERECO FOREIGN KEY (ENDERECO) REFERENCES ENDERECO(CEP); 
 
 -- TABELA IMOVEL_PROPRIETARIO
 ALTER TABLE IMOVEL_PROPRIETARIO ADD CONSTRAINT PROPRIETARIO FOREIGN KEY (CPF_PROPRIETARIO) REFERENCES PESSOA(CPF_PROPRIETARIO);
 ALTER TABLE IMOVEL_PROPRIETARIO ADD CONSTRAINT IMOVEL_GERAL FOREIGN KEY (IMOVEL_GERAL) REFERENCES IMOVEL_GERAL(ID_IMOVEL_GERAL);
 
 -- TABELA CONTRATO
 ALTER TABLE CONTRATO ADD CONSTRAINT IMOVEL_GERAL FOREIGN KEY (IMOVEL_GERAL) REFERENCES IMOVEL_GERAL(ID_IMOVEL_GERAL);
 ALTER TABLE CONTRATO ADD CONSTRAINT PROPRIETARIO FOREIGN KEY (CPF_PROPRIETARIO) REFERENCES PESSOA(CPF_PROPRIETARIO);
 ALTER TABLE CONTRATO ADD CONSTRAINT CLIENTE FOREIGN KEY (CPF_CLIENTE) REFERENCES PESSOA(CPF);
 ALTER TABLE CONTRATO ADD CONSTRAINT PAGAMENTO FOREIGN KEY (PAGAMENTO) REFERENCES PAGAMENTO(ID_PAGAMENTO);
 
 -- TABELA SALA COMERCIAL
 ALTER TABLE SALA_COMERCIAL ADD CONSTRAINT IMOVEL_GERAL FOREIGN KEY (IMOVEL_GERAL) REFERENCES IMOVEL_GERAL(ID_IMOVEL_GERAL);
 
 -- TABELA TERRENO
 ALTER TABLE TERRENO ADD CONSTRAINT IMOVEL_GERAL FOREIGN KEY (IMOVEL_GERAL) REFERENCES IMOVEL_GERAL(ID_IMOVEL_GERAL);
 
 -- TABELA CASA APARTAMENTO
 ALTER TABLE CASA_APARTAMENTO ADD CONSTRAINT IMOVEL_GERAL FOREIGN KEY (IMOVEL_GERAL) REFERENCES IMOVEL_GERAL(ID_IMOVEL_GERAL);
 
 -- TABELA APARTAMENTO
 ALTER TABLE APARTAMENTO ADD CONSTRAINT CASA_AP FOREIGN KEY (CASA_AP) REFERENCES CASA_APARTAMENTO(ID_CASA_AP);
 
 -- TABELA FOTO
 ALTER TABLE FOTO ADD CONSTRAINT IMOVEL_GERAL FOREIGN KEY (IMOVEL_GERAL) REFERENCES IMOVEL_GERAL(ID_IMOVEL_GERAL);
 
 -- TABELA HISTORICO
 ALTER TABLE HISTORICO ADD CONSTRAINT IMOVEL_GERAL FOREIGN KEY (IMOVEL_GERAL) REFERENCES IMOVEL_GERAL(ID_IMOVEL_GERAL);
 
 