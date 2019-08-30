'use strict'
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Posts must be given a title',
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: {
          args: false,
          msg: 'Posts must be given a body',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Posts must belong to a user',
        },
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Posts must belong to a topic',
        },
      },
    },
    {}
  )
  Post.associate = function(models) {
    // associations can be defined here
  }
  return Post
}
