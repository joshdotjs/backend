const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('./products.csv')
  // .pipe(csv({ separator: '\t' }))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });