/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-template */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');

const { mongoose } = require('./db/mongoose'); // connecteed to db
const saveBookDoc = require('./book-parser');
const saveVideoDoc = require('./video-parser');

const Book = require('./models/book');

handlebars.create({ defaultLayout: 'main' });
const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
const viewsPath = path.resolve(path.resolve(__dirname, '../views'));
app.set("views", viewsPath);

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

app.get('/2',(req, res) => {
  Book.find({}, (err, books) => {
    if (err) throw err;
    console.log(books[0]);
    res.render('book', books[0]);
  }).limit(1);
});

// // Обобщенный обработчик 404 (промежуточное ПО)
// app.use((req, res, next) => {
//   res.status(404);
//   res.render('404');
// });

// // Обработчик ошибки 500 (промежуточное ПО)
// app.use( (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500);
//   res.render('500');
// });


app.get('/', (req, res) => {
  res.render('home');
});

app.use('/', (req, res, next) => {
  res.redirect(303, '/');
});

app.listen(3000, () => {
  console.log('Listening at :3000');
});
