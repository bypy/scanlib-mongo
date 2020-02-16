/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
const Video = require('./models/video');

module.exports = data => {
  const infoLength = data.info.video.length;

  let duration;
  let size;
  let units;
  let format;

  try {
    const hours = data.info.video[infoLength - 3].match(/\d+h/)[0].replace('h', '');
    const minutes = data.info.video[infoLength - 3].match(/\d+m/)[0].replace('m', '');
    duration = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  } catch (err) {
    duration = 0;
  }

  try {
    size = parseFloat(data.info.video[infoLength - 2]);
    units = data.info.video[infoLength - 2].split(' ')[1];
  } catch (err) {
    size = size || 0;
    units = units || '';
  }

  try {
    format = data.info.video[2];
    format = data.info.video.slice(1, infoLength - 3).join(' ');
  } catch (err) {
    format = format || 'unknown';
  }

  try {
    const video = new Video({
      origName: data.pageName,
      title: data.heading,
      coverSrc: data.imgPath.slice(data.imgPath.lastIndexOf('/') + 1),
      category: data.category,
      descr: data.description,
      tags: data.tags,
      props: {
        duration: {
          value: duration,
          units: 'minutes',
        },
        language: data.info.video[0],
        format: format,
        size: {
          value: size,
          units: units,
        },
      },
    });
    return video.save();
  } catch (err) {
    console.log(`Ошибка записи в базу ${data.pageName}`, err);
    return Promise.resolve(null);
  }
};
