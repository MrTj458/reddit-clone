'use strict'
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    'comment',
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: {
          args: false,
          msg: 'Comments must have a body',
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Comments must belong to a post',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Comments must belong to a user',
        },
      },
    },
    {}
  )
  comment.associate = function(models) {
    // associations can be defined here
  }
  return comment
}
