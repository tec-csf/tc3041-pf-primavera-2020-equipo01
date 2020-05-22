const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const CasesSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  age:{
    type: Number,
  },
  gender:{
    type: String
  },
  isConfirmed:{
    type: Boolean,
  },
  location:{
    type: Number
  },
  latitude:{
    type: Float
  },
  longitude:{
    type: Float
  },
  recentlyVisited:[{
    type: String
  }],
  closestFriends: [{
    type: Number
  }]
});

const Cases = module.exports = mongoose.model('Cases', CasesSchema, 'Cases');

module.exports.addCase = (newCase, callback) => {
  newCase.save(callback);
}

module.exports.getOne = (id, callback) => {
  Cases.findOne({ _id: id }, callback);
};