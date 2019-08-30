const user = require('./user')
const topic = require('./topic')
const post = require('./post')

/**
 * Combine resolvers
 */
module.exports = [user, topic, post]
