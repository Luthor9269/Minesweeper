const initRankingsModel = (sequelize, DataTypes)=>{

  return sequelize.define(
    'rankings',
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      playerId:{
        type: DataTypes.INTEGER,
        references:{
          model:'players',
          key:'id'
        }
      },
      playerName:{
        type: DataTypes.STRING,
      },
      playerCountry:{
        type:DataTypes.STRING,
      },
      rankId:{
        type: DataTypes.INTEGER,
        references:{
          model:'ranks',
          key:'id'
        },
      },
      gameId:{
        type: DataTypes.INTEGER,
        references:{
          model: 'games',
          key: 'id'
          },
      },
      gameTime:{
        type: DataTypes.INTEGER,
      },
      gameBoard:{
        type:DataTypes.JSON,
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
module.exports = initRankingsModel