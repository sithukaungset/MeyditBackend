const Sequelize = require('sequelize');
const sequelize = require('./config');

const Customer = sequelize.define('customers', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
      },
    }, {
      timestamps: false,
    });
    
    module.exports = Customer;
