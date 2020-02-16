/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
const Book = require('./models/book');

module.exports = data => {
  let units;

  let pages = parseInt(data.info.Pages, 10);
  if (isNaN(pages)) {
    pages = 0;
  }

  let size = parseFloat(data.info.Size);
  if (isNaN(size)) {
    size = 0;
  }

  try {
    units = data.info.Size.split(' ')[1];
  } catch (err) {
    units = '';
  }

  try {
    const book = new Book({
      origName: data.pageName,
      title: data.heading,
      author: data.info.Author.split(',').map(a => a.trim()),
      pubDate: data.info['Pub Date'],
      isbn: data.info.ISBN,
      coverSrc: data.imgPath.slice(data.imgPath.lastIndexOf('/') + 1),
      category: data.category,
      descr: data.description,
      tags: data.tags,
      props: {
        pages: pages,
        language: data.info.Language,
        format: data.info.Format.split('/'),
        size: {
          value: size,
          units: units,
        },
      },
    });
    return book.save();
  } catch (err) {
    console.log(err);
    return Promise.resolve(null);
  }
};
