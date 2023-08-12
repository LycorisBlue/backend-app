// models/index.js
const { Sequelize } = require('sequelize');

var data = 'simplon';

const sequelize = new Sequelize( `${data}`, 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connecté à la base de données ' + data);
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
});

module.exports = sequelize;
