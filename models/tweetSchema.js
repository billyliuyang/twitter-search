var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tweetSchema = new schema({
    author: String,
    screenName: String,
    createTime: Date,
    text: String,
    query: { type: schema.Types.ObjectId, ref: 'Query' }
});

module.exports = mongoose.model('Tweet',tweetSchema);