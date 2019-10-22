const billData = require('../mock/bills');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Bills', billData, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Bills', null, {}),
};
