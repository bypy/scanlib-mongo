const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose'); // connecteed to db
const Book = require('./models/book');
const prepareBookDoc = require('./book-parser');

const app = express();

app.use(bodyParser.json());

app.post('/book', async (req, res) => {
  console.log('got request');
  const data = req.body;
  if (typeof data === 'object' && data.category.indexOf('Video') === -1) {
    try {
      const pagePath = req.headers['x-orig-name'];
      const pageName = pagePath.slice(pagePath.lastIndexOf('\\') + 1).split('.json')[0];
      const book = new Book({
        origName: pageName,
        title: data.heading,
        author: data.info.Author.split(',').map(a => a.trim()),
        pubDate: data.info['Pub Date'],
        isbn: data.info.ISBN,
        coverSrc: data.imgPath.slice(data.imgPath.lastIndexOf('/') + 1),
        category: data.category,
        descr: data.description,
        tags: data.tags,
        props: {
          pages: parseInt(data.info.Pages),
          language: data.info.Language,
          format: data.info.Format.split('/'),
          size: {
            value: parseInt(data.info.Size),
            units: data.info.Size.replace(/^\d+\s?/, ''),
          },
        },
      });
      const savedBook = await book.save();
      if (savedBook) {
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.status(200).send(savedBook);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  }
});

app.listen(3000, () => {
  console.log('Listening at :3000');
});
