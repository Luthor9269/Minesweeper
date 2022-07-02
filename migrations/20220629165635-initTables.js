'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('players',
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name:{
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      email:{
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password:{
        allowNull: false,
        type: Sequelize.STRING
      },
      country:{
        allowNull: false,
        type:Sequelize.STRING
      },
      created_at:{
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at:{
        allowNull: false,
        type: Sequelize.DATE
      }
    })

     await queryInterface.createTable('ranks',
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        allowNull: false,
        type: Sequelize.STRING
      }   ,
      created_at:{
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at:{
        allowNull: false,
        type: Sequelize.DATE
      }   
    })
    
    await queryInterface.createTable('enemies',
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      player_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'players',
          key:'id'
        }
      },
      enemy_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'players',
          key:'id'
        }
      },
      created_at:{
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at:{
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },



  async down (queryInterface, Sequelize) {
   await queryInterface.dropAllTables()
  }
};
