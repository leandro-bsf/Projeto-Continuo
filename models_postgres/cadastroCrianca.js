const Usuario  = require('./usuario');
module.exports = (sequelize, Sequelize) => {
    const CadastroCrianca = sequelize.define('cadastrocrianca', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nome_pai: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rg: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bairro: {
            type: Sequelize.STRING,
            allowNull: false
        },
        endereco: {
            type: Sequelize.STRING,
            allowNull: false
        },
      
        /*id_pai: {
            type: Sequelize.INTEGER,
            reference: {model: 'usuario', key: 'id'}
        }*/
    });

    CadastroCrianca.associate = function(models) {
        CadastroCrianca.belongsTo(models.Usuarios, {foreignKey: 'id_pai', as: 'id'})
      };
    
    return CadastroCrianca;

}