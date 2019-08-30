const user = require('./user')
const topic = require('./topic')
const post = require('./post')
const comment = require('./comment')

/**
 * Combine resolvers
 */
module.exports = [user, topic, post, comment]
