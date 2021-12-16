export const isValidDateString = (dateString) => {
    const d = new Date(dateString);
    return isValidDate(d);
};

export const isValidDate = (date) => {
    return date instanceof Date && isFinite(date);
};
