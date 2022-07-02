const initEnemiesModel = (sequelize, DataTypes)=>{

  return sequelize.define(
    'enemies',
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      playerId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        references:{
          model:'players',
          key:'id'
        }
      },
      enemyId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        references:{
          model:'players',
          key:'id'
        }
      },
      createdAt:{
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt:{
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      underscored: true
    }
  )
}
module.exports = initEnemiesModel