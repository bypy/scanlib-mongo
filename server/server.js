const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose'); // connecteed to db

const saveBookDoc = require('./book-parser');
const saveVideoDoc = require('./video-parser');

const app = express();

app.use(bodyParser.json());

app.post('/add', async (req, res) => {
  console.log('got request ' + req.headers['x-orig-name']);
  const data = req.body;

  if (typeof data !== 'object' || !req.headers['x-orig-name']) {
    console.log('Ошибка в принятых данных!', data, req.headers['x-orig-name']);
    return;
  }

  let savedBook;
  let savedVideo;

  const pagePath = req.headers['x-orig-name'];
  // eslint-disable-next-line prefer-destructuring
  data.pageName = pagePath.slice(pagePath.lastIndexOf('\\') + 1).split('.json')[0];
  if (data.category.indexOf('Books') !== -1) {
    savedBook = await saveBookDoc(data);
  } else if (data.category.indexOf('Video') !== -1) {
    savedVideo = await saveVideoDoc(data);
  }

  const resultData = savedBook || savedVideo;

  if (resultData) {
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.status(200).send(resultData);
  } else {
    res.status(400).end();
  }
});

app.listen(3000, () => {
  console.log('Listening at :3000');
});
