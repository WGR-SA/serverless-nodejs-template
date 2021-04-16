const
Sequelize = require('sequelize'),
mysqlClientFactory = require('../services/mysqlClientFactory'),
factory = (db) =>
{
  return mysqlClientFactory(db).define('key_values', {
    'id': { type: Sequelize.INTEGER, primaryKey: true, allowNull: false},
    'function': { type: Sequelize.STRING(45), allowNull: false},
    'stage': { type: Sequelize.STRING(45), allowNull: false},
    'key': { type: Sequelize.TEXT, allowNull: false},
    'value': { type: Sequelize.TEXT, allowNull: false},
  },{
    // auto fields
    modelName: 'keyValue',
    timestamps: false,
  })
}

module.exports = factory
