'use strict';
module.exports = (sequelize, DataTypes) => {
  const Split = sequelize.define('Split', {
    amount: DataTypes.DECIMAL,
    userId: DataTypes.UUID,
    billId: DataTypes.UUID,
    status: DataTypes.ENUM
  }, {});
  Split.associate = function(models) {
    Split.belongsTo(models.Bill, {
      foreignKey: 'billId',
      as: 'bill'
    })
    Split.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'bill'
    })
  };
  return Split;
};