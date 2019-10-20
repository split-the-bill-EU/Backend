module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      userId: {
        type: Sequelize.UUID
      },
      status: {
        type: Sequelize.ENUM('paid', 'pending'),
        defaultValue: 'pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bills');
  }
};
