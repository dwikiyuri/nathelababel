/**
 * Formats a numeric price into Indonesian Rupiah format: Rp489.000
 * @param {number} amount 
 * @returns {string}
 */
export const formatPrice = (amount) => {
  if (typeof amount !== 'number') return 'Rp0';
  return 'Rp' + amount.toLocaleString('id-ID');
};

/**
 * Formats a date string into editorial date format e.g. "AUGUST 14, 2026"
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase();
};
