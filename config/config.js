const Sequelize = require('sequelize');

const sequelize = new Sequelize('meydit', 'sithukaungset','geniusraver27', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;