var mongoose = require('mongoose');
var schema = mongoose.Schema;

var querySchema = new schema({
    content: { type: String, required: true },
    sendTime: { type: Date, default: Date.now },
    resultsAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Query",querySchema);
