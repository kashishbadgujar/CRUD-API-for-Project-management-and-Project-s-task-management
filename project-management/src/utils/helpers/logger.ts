/**
 * @description Logs error messages to console
 *
 * @param {Error} err - Error object to be logged
 */
const logger = (err: Error): void => {
  console.error('[ERROR]:', err.message);
};

export default logger;
