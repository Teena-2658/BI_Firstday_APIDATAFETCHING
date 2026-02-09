const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: { // link to logged-in user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String, // path to image file
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
