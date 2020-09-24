const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  url: {
    type: String,
  },
  containerTitle: {
    type: String,
  },
  user: {
    type: Schema.ObjectId,
  },


});

module.exports = mongoose.model('card', CardSchema);