'use strict'
/**
 * User Model
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'You must provide a username',
        },
        unique: {
          args: true,
          msg: 'Username already in use',
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'You must provide an email',
        },
        unique: {
          args: true,
          msg: 'Email already in use',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'You must provide a password',
        },
      },
      avatar: DataTypes.STRING,
      resetToken: DataTypes.STRING,
      resetTokenExpiry: DataTypes.STRING,
    },
    {}
  )
  User.associate = function(models) {}
  return User
}
