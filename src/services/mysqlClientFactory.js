const
Sequelize = require('sequelize'),
factory = (db) => {
  return new Sequelize(db.database, db.username, db.password, {
    dialect: db.dialect,
    host: db.host,
    operatorsAliases: Sequelize.Op,
    logging:false
  })
}

module.exports = factory
