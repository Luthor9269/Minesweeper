const initGameModel = (sequelize, DataTypes)=>{

  return sequelize.define(
    'games',
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
      time:{
        type:DataTypes.INTEGER,
      },
      won:{
        type:DataTypes.BOOLEAN
      },
      board:{
        type:DataTypes.JSON,
      },
      squaresOpened:{
        type: DataTypes.INTEGER
      },
      createdAt:{
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt:{
        allowNull: false,
        type: DataTypes.DATE
      },
    },
    {
      underscored: true
    }
  )
}
module.exports = initGameModel