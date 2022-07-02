const initPlayersModel = (sequelize, DataTypes)=>{

  return sequelize.define(
    'players',
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      email:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password:{
        allowNull: false,
        type: DataTypes.STRING
      },
      country:{
        allowNull: false,
        type:DataTypes.STRING
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
module.exports = initPlayersModel