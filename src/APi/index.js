import axios from 'axios'
import config from '../apiConfig'

// Create an Axios instance with base URL and default headers
const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
})

// API Methods
const Api = {
  /**
   * Fetches a list of characters based on specified parameters.
   *
   * @param {number} page - Page number for pagination.
   * @param {string} name - Character name for filtering.
   * @param {string} status - Character status for filtering.
   * @param {string} location - Character location for filtering.
   * @param {string} gender - Character gender for filtering.
   * @param {string} species - Character species for filtering.
   * @param {string} type - Character type for filtering.
   * @returns {Promise} - A promise that resolves with the fetched characters data.
   */
  getCharacters(page, name, status, location, gender, species, type) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(
          config.CHARACTER.BASE.concat(config.QUERY.PAGE)
            .concat(page)
            .concat(config.QUERY.NAME)
            .concat(name)
            .concat(config.QUERY.STATUS)
            .concat(status)
            .concat(config.QUERY.LOCATION)
            .concat(location)
            .concat(config.QUERY.GENDER)
            .concat(gender)
            .concat(config.QUERY.SPECIES)
            .concat(species)
            .concat(config.QUERY.TYPE)
            .concat(type)
        )
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },

  /**
   * Fetches information about a specific character.
   *
   * @param {number} id - Character ID.
   * @returns {Promise} - A promise that resolves with the fetched character data.
   */
  getCharacter(id) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(config.CHARACTER.BASE.concat('/').concat(id))
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },

  /**
   * Fetches information about a specific episode.
   *
   * @param {number} id - Episode ID.
   * @returns {Promise} - A promise that resolves with the fetched episode data.
   */
  getEpisode(id) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(config.EPISODE.BASE.concat('/').concat(id))
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },

  /**
   * Fetches information about a specific location.
   *
   * @param {number} id - Location ID.
   * @returns {Promise} - A promise that resolves with the fetched location data.
   */
  getLocation(id) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(config.LOCATION.BASE.concat('/').concat(id))
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
}

export default Api
