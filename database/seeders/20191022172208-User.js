const userData = require('../mock/users');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', userData, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
