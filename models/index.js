'use strict';

const fs = require('fs');
const path = require('path');
const { HasMany } = require('sequelize');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.players.hasMany(db.enemies, {
  as: 'player',
  foreignKey: 'player_id',
});
db.players.hasMany(db.enemies, {
  as: 'enemy',
  foreignKey: 'enemy_id',
});
db.enemies.belongsTo(db.players, {
  as: 'player',
  foreignKey: 'player_id',
});
db.enemies.belongsTo(db.players, {
  as: 'enemy',
  foreignKey: 'enemy_id',
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;
