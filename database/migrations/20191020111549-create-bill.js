module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bills', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
    },
    title: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.UUID,
    },
    status: {
      type: Sequelize.ENUM('paid', 'pending'),
      defaultValue: 'pending',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Bills'),
};
