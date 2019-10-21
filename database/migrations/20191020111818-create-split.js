module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Splits', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
    },
    amountPaid: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    userId: {
      type: Sequelize.UUID,
    },
    billId: {
      type: Sequelize.UUID,
    },
    status: {
      type: Sequelize.ENUM('paid', 'pending', 'confirmed'),
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Splits'),
};
