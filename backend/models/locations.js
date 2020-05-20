const mongoose = require('mongoose');

const LocationsSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  city:{
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String
  }
});

const Locations = module.exports = mongoose.model('Locations', LocationsSchema, "Locations");

module.exports.add = (newL, callback) => {
  newL.save(callback);
}


module.exports.getAll = (callback) => {
  Locations.find(callback).limit(1000);
}

module.exports.getOne = (req, callback) => {
  const { id } = req.params;
  Locations.findOne({ _id: id }, callback);
};


module.exports.delete = (req, callback) => {
  const { id } = req.params;
  Locations.findByIdAndDelete(id, callback);
};

module.exports.update = (data, callback) => {
  Locations.findByIdAndUpdate(data._id, data , callback);
};
