const root = require('./root')
const user = require('./user')
const topic = require('./topic')
const post = require('./post')
const comment = require('./comment')
const like = require('./like')

/**
 * Combine the types
 */
module.exports = [root, user, topic, post, comment, like]
