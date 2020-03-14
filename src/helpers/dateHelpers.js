// Returns next Tuesday at 8am
export const getNextCommutingTime = (from = new Date()) => {
  const date = new Date(from.getTime());
  // Resets
  date.setHours(8);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  // Adjust to next tuesday
  const dayOfWeek = date.getDay();
  const daysUntilNextTuesday = (7 + 2 - dayOfWeek) % 7 || 7;
  date.setDate(date.getDate() + daysUntilNextTuesday);

  return date;
};

export const getAdjustedEpochSeconds = date => {
  const epochLocal = date.getTime() / 1000;
  const timezoneOffsetSeconds = date.getTimezoneOffset() * 60;
  return epochLocal - timezoneOffsetSeconds;
};
