const fs = require('fs');
const path = require('path');


const srcDir = 'src';
const dirPath = path.resolve(__dirname, '..', srcDir);


const fileReader = (filePath, index, cb) => {
    fs.readFile(filePath, 'utf8', (err, dataLines) => {
        if (err) {
            return console.log(err);
        }
        const terminPos = dataLines.indexOf(':');
        const firstKey = dataLines.slice(0, terminPos).replace('{', '').trim();
        console.log(firstKey);
        console.log('Открываю следующий...');
        cb(index+1, cb);
    });
};


const listIterator = (dir, dirList) => {

    const processtListItem = (i, cb) => {     
        try {
            const current = path.join(dir, dirList[i]);
            console.log(`Файл номер: ${i} по адресу ${current} :...`);
            fileReader(current, i, cb);
        } catch(e) {
            console.log('Все файлы успешно обработаны');
        }  
    };

    if (dirList.length > 0) processtListItem(0, processtListItem);
};


const directoryLister = (dir) => {
	fs.readdir(dir, (err, dirList) => {
    	if (err) {
            return console.log(err);
        }
        listIterator(dir, dirList);
    });
};


const main = () => {
    directoryLister(dirPath);
};


// получить список файлов каталога, прочитать каждый файл и вывести в консоль первую строку
main();