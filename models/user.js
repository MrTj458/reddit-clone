'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: DataTypes.STRING,
      resetToken: DataTypes.STRING,
      resetTokenExpiry: DataTypes.STRING,
    },
    {}
  )
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}
