'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    amount: DataTypes.DECIMAL,
    userId: DataTypes.UUID,
    status: DataTypes.ENUM
  }, {});
  Bill.associate = function(models) {
    Bill.belongsTo(models.User, {
      foreignKey: 'useId',
      as: 'owner'
    })
    Bill.hasMany(models.Split, {
      foreignKey: 'billId',
      onDelete: 'CASCADE',
      as: 'splits'
    })
  };
  return Bill;
};