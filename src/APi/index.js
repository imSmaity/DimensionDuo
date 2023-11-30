import axios from 'axios'
import config from '../apiConfig'

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
})

const Api = {
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
  getCharacter(id) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(config.CHARACTER.BASE.concat('/').concat(id))
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  getEpisode(id) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(config.EPISODE.BASE.concat('/').concat(id))
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
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
