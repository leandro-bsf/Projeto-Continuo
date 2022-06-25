const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const path  =  require('path');
const Administrador = require('../models_postgres/administrador');
const Matriculas = require ('../models_postgres/matriculas');


const {
    Matricula
} = require('../config/db_sequelize');

/*db.sequelize.sync({ force: true }).then(() => {
    console.log('{ force: true }');
});*/

module.exports = {
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req, res) {

        db.Administrador.findAll({ where: { login: req.body.login, senha: req.body.senha } }).then(administrador => {
            if (administrador.length > 0) {

                req.session.login = req.body.login;
                res.redirect('/home');
            } else {

                res.redirect('/');
            }
        });
    },

    async getLogin(req, res) {
        res.render('administrador/loginAdm', { layout: 'noMenu.handlebars' });
    },

    async getRecuperarSenha(req, res) {
        db.Administrador.findAll({ where: { login: req.params.login } }).then(administrador => {
            if (administrador.length > 0) {
                res.render('administrador/recuperarSenha', { layout: 'noMenu.handlebars', login: req.params.login, pergunta: usuario[0].pergunta_secreta });
            } else {
                res.redirect('/');
            }
        });
    },

    async postRecuperarSenha(req, res) {
        db.Administrador.findAll({ where: { login: req.body.login, resposta_pergunta: req.body.resposta } }).then(administrador => {
            if (administrador.length > 0) {
                res.render('administrador/senhaRecuperada', { layout: 'noMenu.handlebars', senha: usuario[0].senha });
            } else {
                res.redirect('/');
            }
        });
    },

    async getCreateAdm(req, res) {
        res.render('administrador/admCreate');
    },

    async postCreateAdm(req, res) {
        db.Administrador.create({
            login: req.body.login,
            senha: req.body.senha,
            rg: req.body.rg
        });
        res.redirect('/home');
    },
    async getCreateCreche(req, res){
        res.render('administrador/crecheCreate');
    },
    
    async postCreateCreche(req, res) {
        db.Creches.create({
                nome_Creche: req.body.nome_Creche,
                bairro: req.body.bairro,
                rua: req.body.rua,
                cidade: req.body.cidade,
                fone: req.body.fone
        });
        res.redirect('/home');
    },
    
    async getCreateDiretor(req, res) {
        res.render('administrador/diretorCreate');
    },
    
    async postCreateDiretor(req, res) {
        db.Diretor.create({
            loginDiretor: req.body.loginDiretor,
            senhaDiretor: req.body.senhaDiretor,
            nomeDiretor: req.body.nomeDiretor,
            cidadeDiretor: req.body.cidadeDiretor,
            bairroDiretor: req.body.bairroDiretor,
            ruaDiretor: req.body.ruaDiretor
        });
        res.redirect('/home');
    },

    async getEditDiretor(req, res) {
        await Diretor.findOne({ id: req.params.id }).then((teste) => {
            res.render('administrador/diretorEdit', {
                teste: teste.toJSON()
            });
        });
    },
    async getListVagasAdm (req, res){
        db.Matriculas.findAll().then(matriculas => {
            res.render('administrador/matriculaListAdm', {
                matriculas: matriculas.map(matriculas => matriculas.toJSON())
            });
        });

    },
    async getEditMatricula( req, res){

        console.log("Entrou no get");
        await Matriculas.findOne({
            id: req.params.id
        }).then((matriculas) => {

            res.render('administrador/matriculaEditAdm', {
                matriculas: matriculas.toJSON()
            });
        });
    },
    async postEditMatricula(req, res){
        console.log("Entrou no post");
        db.Matriculas.update(req.body, {
             where: {
                id: req.body.id
             }
        },{
            nome:req.body.nome,
            nome_pai: req.body.nome_pai,
            rg: req.body.rg,
            bairro:  req.body.bairro,
            endereco: req.body.endereco,
            fone: req.body. fone,
            comprovante_res: req.body.comprovante_res,
            status:  req.body.status

        })
        res. redirect('/home');
    }
}