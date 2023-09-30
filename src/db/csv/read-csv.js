const csv = require('csv-parser')
const fs = require('fs')


const readCSV = () => {
  const results = [];
  
  fs.createReadStream('./products.csv')
    // .pipe(csv({ separator: '\t' }))
    .pipe(csv())
    .on('data', (data) => results.push(data))
    // .on('end', () => {
    //   console.log(results);
    // });

  return results;
};

module.exports = { readCSV };