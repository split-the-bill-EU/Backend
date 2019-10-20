'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    amount: DataTypes.DECIMAL,
    userId: DataTypes.UUID,
    status: DataTypes.ENUM
  }, {});
  Bill.associate = function(models) {
    // associations can be defined here
  };
  return Bill;
};