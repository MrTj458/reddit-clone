'use strict'
/**
 * Topic model
 */
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    'Topic',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Topics must be given a name',
        },
        unique: {
          args: true,
          msg: 'This topic already exists',
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Topics must be given a description',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Topics must belong to a user',
        },
      },
    },
    {}
  )
  Topic.associate = function(models) {
    // associations can be defined here
  }
  return Topic
}
