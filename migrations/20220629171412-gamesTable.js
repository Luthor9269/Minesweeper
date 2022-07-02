'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('games',
    {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      player_id:{
        type: Sequelize.INTEGER,
        references:{
          model:'players',
          key:'id'
        }
      },
      time:{
        type:Sequelize.INTEGER,
      },
      won:{
        type:Sequelize.BOOLEAN
      },
      board:{
        type:Sequelize.JSON,
      },
      squares_opened:{
        type:Sequelize.INTEGER,
      },
      created_at:{
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at:{
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('games', 
    {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      player_id:{
        type: Sequelize.INTEGER,
        references:{
          model:'players',
          key:'id'
        }
      },
      time:{
        type:Sequelize.INTEGER,
      },
      won:{
        type:Sequelize.BOOLEAN
      },
      board:{
        type:Sequelize.JSON
      },
      squares_opened:{
        type:Sequelize.INTEGER,
      },
      created_at:{
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at:{
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  }
};
