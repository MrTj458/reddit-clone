'use strict'
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Likes must be given a user id',
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Likes must be given a post id',
        },
      },
    },
    {}
  )
  Like.associate = function(models) {
    // associations can be defined here
  }
  return Like
}
