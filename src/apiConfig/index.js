const config = {
  API_URL: process.env.REACT_APP_API_URL,
  CHARACTER: {
    BASE: '/character',
  },
  EPISODE: {
    BASE: '/episode',
  },
  LOCATION: {
    BASE: '/location',
  },
  QUERY: {
    PAGE: '/?page=',
    NAME: '&name=',
    STATUS: '&status=',
    LOCATION: '&location=',
    GENDER: '&gender=',
    SPECIES: '&species=',
    TYPE: '&type=',
  },
}

export default config
