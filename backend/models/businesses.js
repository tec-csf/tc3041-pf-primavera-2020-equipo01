const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const BusinessesSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  ywage:{
    type: Float,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  employeeSince:{
    type: String
  },
  suppliers:[{
    type: Number // array
  }]
  
});

const Businesses = module.exports = mongoose.model('Businesses', BusinessesSchema, "Businesses");

module.exports.add = (newB, callback) => {
  newB.save(callback);
}


module.exports.getAll = (callback) => {
  Businesses.find(callback).limit(1000);
}

module.exports.getOne = (req, callback) => {
  const { id } = req.params;
  Businesses.findOne({ _id: id }, callback);
};

module.exports.delete = (req, callback) => {
  const { id } = req.params;
  Businesses.findByIdAndDelete(id, callback);
};

module.exports.update = (data, callback) => {
  Businesses.findByIdAndUpdate(data._id, data , callback);
};

// lookup
module.exports.wealthy = (callback) => {
  Businesses.aggregate([
      { "$group": { "_id": "null", avg: { "$avg": "$ywage"} }}
  ]).then(res => {
    const avg= res[0].avg
    Businesses.aggregate([{$lookup: {from: "Cases", localField: "_id", foreignField: "_id", as: "Info"}}, 
      {$group: {
        _id: "$Info.isConfirmed", 
        "total_above_avg_income": {
                "$sum": { "$cond": [
                    { "$gt": [ "$ywage", avg ] },
                    1,
                    0
                ]}
            },
        "total_below_avg_income": {
                "$sum": { "$cond": [
                    { "$lt": [ "$ywage", avg ] },
                    1,
                    0
                ]}
            }
    }}], callback)
  })
}