const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);

const formattedTime = dayjs
    .utc("2025-11-21T17:43:33.010Z")
    .tz(dayjs.tz.guess())
    .fromNow();

console.log(formattedTime);
