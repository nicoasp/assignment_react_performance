const moment = require("moment");

const dayMillSec = 24 * 60 * 60 * 1000;

const adjustDay = (date) => {
  if (new Date(date).getDay() === 6) {
    return date - dayMillSec;
  }
  if (new Date(date).getDay() === 0) {
    return date - 2 * dayMillSec;
  }
  return date;
}

const dateBuilder = (date) => {  
  let current = adjustDay(date);
  let dayAgo = adjustDay(date - dayMillSec);
  let weekAgo = adjustDay(date - 7 * dayMillSec);
  let monthAgo = adjustDay(date - 30 * dayMillSec);

  return {
    current: moment(new Date(current)).format("YYYYMMDD"),
    dayAgo: moment(new Date(dayAgo)).format("YYYYMMDD"),
    weekAgo: moment(new Date(weekAgo)).format("YYYYMMDD"),
    monthAgo: moment(new Date(monthAgo)).format("YYYYMMDD")
  }
}

const datesStringBuilder = (datesObject) => {
	const datesArr = [datesObject.current, datesObject.dayAgo, datesObject.weekAgo, datesObject.monthAgo];
	return datesArr.join(",");
}

module.exports = {
	dateBuilder,
	datesStringBuilder
}
