const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  origName: {
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
  },
  pubDate: {
    type: Number,
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
  },
  descr: [{}],
  tags: {
    type: [String],
  },
  props: {
    pages: Number,
    language: String,
    format: {
      type: [String],
    },
    size: {
      value: Number,
      units: String,
    },
  },
});

module.exports = mongoose.model('Book', BookSchema);
