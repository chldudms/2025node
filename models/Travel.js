const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Travel = sequelize.define('Travel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'travellist',
  timestamps: false,  // createAt, updatedAt 컬럼 사용 안 함
});

module.exports = Travel;

