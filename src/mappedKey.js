import pdfFiller from 'pdffiller';
import path from 'path';
import fs from 'fs';
import util from 'util';

//const sourcePDF = path.resolve('file', './test.pdf');
const sourcePDF = 'http://res.cloudinary.com/hmtri/image/upload/v1486695334/golden_west.pdf';
const sourcePDF2 = 'http://res.cloudinary.com/hmtri/image/upload/v1487060506/golden_west_2.pdf';
const sourcePDF3 = 'http://res.cloudinary.com/hmtri/image/upload/v1486695334/golden_west_3.pdf';
const sourcePDF4 = 'http://res.cloudinary.com/hmtri/image/upload/v1486695334/golden_west_4.pdf';
const sourcePDF5 = 'http://res.cloudinary.com/hmtri/image/upload/v1486695334/golden_west_5.pdf';

const FDF_data = new Promise((resolve, reject) => {
    pdfFiller.generateFDFTemplate(sourcePDF, null, function (err, fdfData) {
        if (err) throw err;
        resolve(fdfData);
    })
});

const FDF_data2 = new Promise((resolve, reject) => {
    pdfFiller.generateFDFTemplate(sourcePDF2, null, function (err, fdfData) {
        if (err) throw err;
        resolve(fdfData);
    })
});

const FDF_data3 = new Promise((resolve, reject) => {
    pdfFiller.generateFDFTemplate(sourcePDF3, null, function (err, fdfData) {
        if (err) throw err;
        resolve(fdfData);
    })
});

const FDF_data4 = new Promise((resolve, reject) => {
    pdfFiller.generateFDFTemplate(sourcePDF4, null, function (err, fdfData) {
        if (err) throw err;
        resolve(fdfData);
    })
});

const FDF_data5 = new Promise((resolve, reject) => {
    pdfFiller.generateFDFTemplate(sourcePDF5, null, function (err, fdfData) {
        if (err) throw err;
        resolve(fdfData);
    })
});

// FDF_data.then(value => {
//     fs.writeFileSync(path.resolve('file', `./test.key.txt`), util.inspect(value), 'utf-8');
//         console.log("The file was saved!");
// })

// FDF_data2.then(value => {
//     fs.writeFileSync(path.resolve('file', `./test2.key.txt`), util.inspect(value), 'utf-8');
//         console.log("The file was saved!");
// })

// FDF_data3.then(value => {
//     fs.writeFileSync(path.resolve('file', `./test3.key.txt`), util.inspect(value), 'utf-8');
//         console.log("The file was saved!");
// })

// FDF_data4.then(value => {
//     fs.writeFileSync(path.resolve('file', `./test4.key.txt`), util.inspect(value), 'utf-8');
//         console.log("The file was saved!");
// })

// FDF_data5.then(value => {
//     fs.writeFileSync(path.resolve('file', `./test5.key.txt`), util.inspect(value), 'utf-8');
//         console.log("The file was saved!");
// })

Promise.all([FDF_data, FDF_data2, FDF_data3, FDF_data4, FDF_data5]).then(values => {
    let count = 1;
    values.map(value => {
        fs.writeFileSync(path.resolve('file', `./test${count}.key.txt`), util.inspect(value), 'utf-8');
        console.log("The file was saved!");
        count++;
    });
});

