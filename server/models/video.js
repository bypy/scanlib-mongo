const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
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
      type: String,
      trim: true,
    },
    size: {
      value: Number,
      units: String,
    },
  },
});

module.exports = mongoose.model('Video', VideoSchema);
