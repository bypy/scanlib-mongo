const http = require('http');

const { directoryLister, fileReader } = require('../utils/utils-async');

const srcDir = '../src';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/add',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const listIterator = dirList => {
  const processtListItem = async (i, cb) => {
    try {
      const curr = dirList[i];
      if (!curr) throw new Error();

      try {
        const content = await fileReader(curr);
        options.headers['Content-Length'] = Buffer.byteLength(content);
        options.headers['X-Orig-Name'] = curr;
        const req = http.request(options, res => {
          if (res.statusCode !== 200) {
            console.log(`ОШИБКА! Файл ${curr} не загружен`);
          }
          res.on('data', () => {
            // necessary dummy
          });
          res.on('end', () => {
            // setTimeout(() => {
            //   cb(i + 1, cb);
            // }, 1000);
            cb(i + 1, cb);
          });
        });
        req.on('error', error => {
          console.error(error);
        });
        req.write(content);
        req.end();
      } catch (err) {
        console.log(`Ошибка чтения файла ${curr}`);
        console.log('Открываю следующий...');
        cb(i + 1, cb);
      }
    } catch (e) {
      console.log('Все файлы успешно обработаны');
      process.exit(0);
    }
  };

  if (dirList.length > 0) processtListItem(0, processtListItem);
};

const readFromFolderAndSend = async folder => {
  try {
    const files = await directoryLister(folder);
    listIterator(files);
  } catch (err) {
    console.log(`Ошибка получения списка файлов в каталоге ${folder}`);
    process.exit(1);
  }
};

readFromFolderAndSend(srcDir);
