const apnts_possible = [];
for (let day = 10; day < 30; day++) {
  for (let hour = 9; hour < 17; hour++) {
    const date_time = `2023-11-${day} ${hour}:00:00-06:00`;
    apnts_possible.push({ date_time, possible: false, });
  }
}
console.log('apnts_possible: ', apnts_possible);

exports.seed = function (knex) {
  return knex('apnts_possible').insert(apnts_possible);
};