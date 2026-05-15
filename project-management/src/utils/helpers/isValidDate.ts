/**
 * Validates whether the provided value is a valid date.
 *
 * @param date - Date value as a string or Date object
 * @returns True if the date is valid, otherwise false
 */
const isValidDate = (date: string | Date): boolean => {
  return !Number.isNaN(new Date(date).getTime());
};

export default isValidDate;
