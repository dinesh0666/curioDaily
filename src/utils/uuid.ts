/**
 * Generate a UUID with fallback for environments that don't support crypto.randomUUID()
 */
export const generateUUID = (): string => {
  // Try to use crypto.randomUUID() if available
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID();
    } catch (error) {
      console.warn('crypto.randomUUID() failed, using fallback:', error);
    }
  }

  // Fallback UUID generator (RFC 4122 version 4)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Generate a short ID (8 characters) for simpler use cases
 */
export const generateShortId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

/**
 * Generate a timestamp-based ID for ordering
 */
export const generateTimestampId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
