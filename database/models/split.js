module.exports = (sequelize, DataTypes) => {
  const Split = sequelize.define(
    'Split',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      amount: DataTypes.DECIMAL,
      userId: DataTypes.UUID,
      billId: DataTypes.UUID,
      status: DataTypes.ENUM('paid', 'pending'),
    },
    {},
  );
  Split.associate = models => {
    Split.belongsTo(models.Bill, {
      foreignKey: 'billId',
      as: 'bill',
    });
    Split.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner',
    });
  };
  return Split;
};
