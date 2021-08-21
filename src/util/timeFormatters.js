import moment from "moment";

export const formatDuration = (startTime, endTime) => {
    const duration = moment.duration(Math.abs(endTime - startTime));

    return duration.humanize();
};

export const formatDate = (date) => moment(date).format("MM/DD/YYYY");
export const formatDateTime = (date) => moment(date).format();
