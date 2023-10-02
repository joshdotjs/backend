const csv = require('csv-parser')
const fs = require('fs')

// ==============================================

// const readCSV = () => {
//   const results = [];
  
//   fs.createReadStream('./products.csv')
//     // .pipe(csv({ separator: '\t' }))
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     // .on('end', () => {
//     //   console.log(results);
//     // });

//   return results;
// };

// ==============================================

async function readCSV(filePath) {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// ==============================================

module.exports = { readCSV };