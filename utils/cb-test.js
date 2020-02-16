const { directoryLister, fileReader } = require('./utils-async');

const srcDir = '../src';

const printExcerptFromFiles = async () => {
  try {
    const files = await directoryLister(srcDir);
    files.forEach(async f => {
      try {
        const content = await fileReader(f);
        const terminPos = content.indexOf(':');
        const firstKey = content
          .slice(0, terminPos)
          .replace('{', '')
          .trim();
        console.log(`Файл номер ${files.indexOf(f)}: первый ключ= ${firstKey}`);
      } catch (err) {
        console.log(err);
        throw err;
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

printExcerptFromFiles();
