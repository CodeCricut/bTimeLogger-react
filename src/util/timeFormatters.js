import moment from "moment";

const formatDuration = (startTime, endTime) => {
    const duration = moment.duration(Math.abs(endTime - startTime));

    return duration.humanize();
    // const days = duration.days() >= 1 ? `${duration.days()} days ` : "";

    // const hours = duration.hours();
    // const hStr = hours < 10 ? prependZero(hours) : hours;

    // const minutes = duration.asMinutes()

    // const hms = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
    // return `${days}${hms}`;
};

// const prependZero = (str) => `0${str}`;

export { formatDuration };
