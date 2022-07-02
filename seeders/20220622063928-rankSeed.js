'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
     'ranks',
     [
       {
           id:1,
           name:"Recruit",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:2,
           name:"Seaman",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:3,
           name:"Warrant Officer",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:4,
           name:"Chief Warrant Officer",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:5,
           name:"Officer",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:6,
           name:"Lieutenant",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:7,
           name:"Commander",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:8,
           name:"Captain",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:9,
           name:"Rear Admiral",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:10,
           name:"Vice Admiral",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:11,
           name:"Admiral",
           created_at: new Date(),
           updated_at: new Date()
       },
       {
           id:12,
           name:"Fleet Admiral",
           created_at: new Date(),
           updated_at: new Date()
       },
       
     ]
   )

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDeleteAll();
  }
};
