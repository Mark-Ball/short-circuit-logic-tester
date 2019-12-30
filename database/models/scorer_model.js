const mongoose = require('mongoose');
const ScorersSchema = require('./../schemas/scorers_schema');

const ScorerModel = mongoose.model('scorer', ScorersSchema);

module.exports = ScorerModel;