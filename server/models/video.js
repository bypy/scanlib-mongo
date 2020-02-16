const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  origURL: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: [String],
    trim: true,
  },
  pubDate: {
    type: Date,
    trim: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  coverSrc: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    trim: true,
  },
  descr: [{}],
  tags: {
    type: [String],
    trim: true,
  },
  props: {
    pages: Number,
    language: String,
    format: {
      type: [String],
      trim: true,
    },
    size: Number,
  },
});

module.exports = mongoose.model('Book', BookSchema);
