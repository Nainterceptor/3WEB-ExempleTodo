const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: String,
  status: Boolean,
});

module.exports = mongoose.model('Item', ItemSchema);