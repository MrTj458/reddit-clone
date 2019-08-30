const user = require('./user')
const topic = require('./topic')
const post = require('./post')
const comment = require('./comment')
const like = require('./like')

/**
 * Combine resolvers
 */
module.exports = [user, topic, post, comment, like]
