const { zeroPad: z } = require('./string');

// ==============================================

const dateTimeSQL = (date_time) => {

  // const date_time = { 
  //   year: 2023, 
  //   month: 10, 
  //   day: 4, 
  //   hour: 39, 
  //   minute: 27, 
  //   second: .707315, // Fractional seconds (in this case, microseconds)
  //   time_zone_offset: '-05', // 5 hours behind Coordinated Universal Time (UTC). In the context of the United States, this corresponds to Central Time (CT) during Daylight Saving Time.
  // };

  // 2023-10-04 19:39:27.707315-05:
  //    2023-10-04: This is the date portion.
  //      2023: Year
  //      10: Month (October)
  //      04: Day of the month
  //    19:39:27.707315: This is the time portion. 
  //      19: Hour in 24-hour format (7 PM in 12-hour format)
  //      39: Minutes
  //      27: Seconds
  //      .707315: Fractional seconds (in this case, microseconds)
  //      -05: This represents the time zone offset, indicating that the time is 5 hours behind Coordinated Universal Time (UTC). In the context of the United States, this corresponds to Central Time (CT) during Daylight Saving Time.
  // => "4th of October 2023, 7:39:27.707315 PM, Central Time (with Daylight Saving Time)"
  
  const { year, month, day, hour, minute, second, time_zone_offset } = date_time;
  const date_time_sql = `${year}-${z(month)}-${z(day)} ${z(hour)}:${z(minute)}:${second}-${z(-1 * time_zone_offset)}`;
  return date_time_sql;
};

// ==============================================

module.exports = {
  dateTimeSQL,
};