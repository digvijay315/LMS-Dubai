// Timezone mapping for common regions
const regionToTimezone = {
  // Asia
  'India': 'Asia/Kolkata',
  'Japan': 'Asia/Tokyo',
  'Singapore': 'Asia/Singapore',
  
  // Europe
  'UK': 'Europe/London',
  'Germany': 'Europe/Berlin',
  'France': 'Europe/Paris',
  
  // Americas
  'USA': 'America/New_York',
  'Canada': 'America/Toronto',
  'Brazil': 'America/Sao_Paulo',
  
  // Australia/Oceania
  'Australia': 'Australia/Sydney',
  'New Zealand': 'Pacific/Auckland',
  
  // Default fallback
  'Default': 'UTC'
};

/**
 * Converts local date and time to UTC string
 * @param {string} localDate - Date string (YYYY-MM-DD)
 * @param {string} localTime - Time string (HH:MM)
 * @returns {string} UTC date string
 */
export function convertToUTC(localDate, localTime) {
  try {
    const [hours, minutes] = localTime.split(':').map(Number);
    const date = new Date(localDate);
    date.setHours(hours, minutes);
    return date.toUTCString();
  } catch (error) {
    console.error('Error converting to UTC:', error);
    return 'Invalid date/time';
  }
}

/**
 * Gets timezone for a given region
 * @param {string} region - Employee's region
 * @returns {string} IANA timezone string
 */
export function getTimezoneByRegion(region) {
  return regionToTimezone[region] || regionToTimezone['Default'];
}

/**
 * Formats UTC date to local time string
 * @param {string} utcDate - UTC date string
 * @param {string} timezone - Target timezone
 * @returns {string} Formatted local time
 */
export function convertToLocalTime(utcDate, timezone) {
  try {
    const options = {
      timeZone: timezone,
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    };
    return new Date(utcDate).toLocaleString('en-US', options);
  } catch (error) {
    console.error('Error converting to local time:', error);
    return 'Invalid timezone';
  }
}

/**
 * Formats training times for display
 * @param {Object} training - Training object
 * @param {string} region - Employee's region
 * @returns {Object} Formatted times
 */
export function formatTrainingTimes(training, region) {
  const timezone = getTimezoneByRegion(region);
  
  return {
    utcStart: convertToUTC(training.from_date, training.from_time),
    utcEnd: convertToUTC(training.to_date, training.to_time),
    localStart: convertToLocalTime(
      new Date(`${training.from_date}T${training.from_time}`),
      timezone
    ),
    localEnd: convertToLocalTime(
      new Date(`${training.to_date}T${training.to_time}`),
      timezone
    ),
    timezone
  };
}

/**
 * Gets all available regions for dropdowns
 * @returns {Array} List of supported regions
 */
export function getAvailableRegions() {
  return Object.keys(regionToTimezone).filter(region => region !== 'Default');
}