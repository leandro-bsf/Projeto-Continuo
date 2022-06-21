const Sequelize = require('sequelize');

const sequelize = new Sequelize('teste', 'postgres', 'Cs123', {
    host: 'localhost',
    dialect: 'postgres'
})

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require('../models_postgres/usuario.js')(sequelize, Sequelize);
db.Diretor = require('../models_postgres/diretor')(sequelize, Sequelize);
db.CadastroCrianca = require('../models_postgres/cadastroCrianca')(sequelize , Sequelize);
db.Creches = require ('../models_postgres/creches')(sequelize, Sequelize);
db.matriculas = require ('../models_postgres/matriculas') (sequelize, Sequelize );
db.VagasCreches = require ('../models_postgres/vagasCreche') (sequelize, Sequelize);
db.Administrador = require ('../models_postgres/administrador') (sequelize, Sequelize);

//relacionamento de tabelas
db.Diretor.belongsTo(db.Creches);
db.Creches.hasMany(db.VagasCreches);
db.CadastroCrianca.belongsTo(db.matriculas);
db.Usuario.hasMany(db.CadastroCrianca);

module.exports = db;