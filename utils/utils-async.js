const fs = require('fs');
const path = require('path');


const directoryLister = (srcS) => {
    return new Promise( (resolve, reject) => {
        const dirPath = path.resolve(__dirname, srcS);
        fs.readdir(dirPath, (err, dirList) => {
            if (err) {
                console.log(`Ошибка получения списка содержимого каталога ${dirPath}`);
                reject(err);
            }
            resolve( dirList.map( fileName => path.join(dirPath, fileName) ));
        });
    });
};


const fileReader = (filePath) => {
    return new Promise( (resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, fileData) => {
            if (err) {
                reject(err);
            }
            resolve(fileData);
        });
    });
};


module.exports = {
    directoryLister,
    fileReader
};