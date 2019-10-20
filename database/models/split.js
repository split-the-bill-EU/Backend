'use strict';
module.exports = (sequelize, DataTypes) => {
  const Split = sequelize.define('Split', {
    amount: DataTypes.DECIMAL,
    userId: DataTypes.UUID,
    billId: DataTypes.UUID,
    status: DataTypes.ENUM
  }, {});
  Split.associate = function(models) {
    // associations can be defined here
  };
  return Split;
};