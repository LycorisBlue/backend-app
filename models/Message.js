const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiver_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false, // Vous ne voulez pas les horodatages pour les messages
});

module.exports = Message;
