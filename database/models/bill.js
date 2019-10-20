'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define(
    'Bill',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      amount: DataTypes.DECIMAL,
      userId: DataTypes.UUID,
      status: DataTypes.ENUM('paid', 'pending')
    },
    {}
  );
  Bill.associate = function(models) {
    Bill.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner'
    });
    Bill.hasMany(models.Split, {
      foreignKey: 'billId',
      onDelete: 'CASCADE',
      as: 'splits'
    });
  };
  return Bill;
};
