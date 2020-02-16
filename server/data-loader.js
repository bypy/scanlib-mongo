const http = require('http');

const { directoryLister, fileReader } = require('../utils/utils-async');

const srcDir = '../src';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/book',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const printExcerptFromFiles = async () => {
  try {
    const files = await directoryLister(srcDir);
    for (let i = 0; i < files.length; i += 1) {
      const curr = files[i];
      const content = await fileReader(curr);
      try {
        options.headers['Content-Length'] = content.length;
        options.headers['X-Orig-Name'] = curr;
        const req = http.request(options);
        req.write(content);
        console.log(content);
      } catch (err) {
        console.log(err);
      }
    }
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

printExcerptFromFiles();
