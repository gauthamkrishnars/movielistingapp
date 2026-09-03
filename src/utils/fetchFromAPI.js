import { OMDB_API_KEY, OMDB_BASE_URL } from './constants';

/**
 * Fetch data from the OMDb API.
 * @param {object} params - Query parameters (e.g., { s: 'batman', type: 'movie' })
 * @returns {Promise<object>} - The API response data
 */
export const fetchFromOMDb = async (params = {}) => {
  const defaultParams = {
    apikey: OMDB_API_KEY,
    ...params,
  };

  const queryString = new URLSearchParams(defaultParams).toString();

  try {
    const response = await fetch(`${OMDB_BASE_URL}/?${queryString}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'No results found');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch from OMDb API:', error);
    throw error;
  }
};
