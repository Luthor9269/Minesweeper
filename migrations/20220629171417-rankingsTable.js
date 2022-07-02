'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('rankings',
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      player_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'players',
          key:'id'
        }
      },
      player_name:{
        type: Sequelize.STRING,
      },
      player_country:{
        type: Sequelize.STRING,
      },
      rank_id:{
        type: Sequelize.INTEGER,
        references:{
          model:'ranks',
          key:'id'
        }
      },
      game_id:{
        type: Sequelize.INTEGER,
        references:{
          model: 'games',
          key: 'id',
        }
      },
      game_time:{
        type: Sequelize.INTEGER,
      },
      game_board:{
        type:Sequelize.JSON
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
    await queryInterface.dropTable('rankings',
    {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      player_name:{
        type: Sequelize.STRING,
      },
      player_country:{
        type: Sequelize.STRING,
      },
      rank_id:{
        type: Sequelize.INTEGER,
        references:{
          model:'ranks',
          key:'id'
        }
      },
      game_id:{
        type: Sequelize.INTEGER,
        references:{
          model: 'games',
          key: 'id',
        }
      },
      game_time:{
        type: Sequelize.INTEGER,
      },
      game_board:{
        type: Sequelize.JSON,
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
  }
};
