const root = require('./root')
const user = require('./user')
const topic = require('./topic')
const post = require('./post')

/**
 * Combine the types
 */
module.exports = [root, user, topic, post]
