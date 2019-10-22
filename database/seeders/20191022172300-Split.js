const splitData = require('../mock/splits');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Splits', splitData, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Splits', null, {}),
};
