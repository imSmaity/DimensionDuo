import Search from './components/Search'
import './style.css'
import { useCallback, useEffect, useState } from 'react'
import Api from '../../APi'
import Card from '../../components/Card'
import Pagination from './components/Pagination'
import Select from '../../components/Select'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Loading from '../../components/Loading'
import noresult from '../../assets/undraw_posting_photo_re_plk8.svg'

/**
 * Functional component representing the Home page.
 *
 * @returns {JSX.Element} - Returns JSX representing the Home component.
 */
const Home = () => {
  // State Hooks
  const [data, setData] = useState(null) // Manages the data fetched from the API
  const [loading, setLoading] = useState(false) // Manages the loading state for character fetch
  const [page, setPage] = useState(1) // Manages the current page number
  const [status, setStatus] = useState('') // Manages the status filter for characters
  const [location, setLocation] = useState('') // Manages the location filter for characters
  const [gender, setGender] = useState('') // Manages the gender
  const [species, setSpecies] = useState('') // Manages the species filter for characters
  const [type, setType] = useState('') // Manages the type filter for characters
  const [search, setSearch] = useState('') // Manages the search input value
  const [isFilterOpen, setIsFilterOpen] = useState(true) // Manages the visibility of filters in mobile devices
  const [filtersList, setFiltersList] = useState({
    status: [],
    location: [],
    gender: [],
    species: [],
    type: [],
  }) // Manages a list of filters for different properties (status, location, gender, species, type)

  /**
   * Fetches the list of unique filters based on characters' data.
   *
   * @param {Array} characters - An array of character data.
   */
  const getFiltersList = (characters) => {
    characters.forEach((character) => {
      // Status
      if (character.status && !filtersList.status.includes(character.status)) {
        filtersList.status.push(character.status)
        setFiltersList({ ...filtersList })
      }

      // Location
      if (
        character.location.name &&
        !filtersList.location.includes(character.location.name)
      ) {
        filtersList.location.push(character.location.name)
        setFiltersList({ ...filtersList })
      }

      // Gender
      if (character.gender && !filtersList.gender.includes(character.gender)) {
        filtersList.gender.push(character.gender)
        setFiltersList({ ...filtersList })
      }

      // Species
      if (
        character.species &&
        !filtersList.species.includes(character.species)
      ) {
        filtersList.species.push(character.species)
        setFiltersList({ ...filtersList })
      }

      // Type
      if (character.type && !filtersList.type.includes(character.type)) {
        filtersList.type.push(character.type)
        setFiltersList({ ...filtersList })
      }
    })
  }

  /**
   * Fetches character data based on specified filters.
   *
   * @param {number} page - The page number to fetch.
   * @param {string} name - The search query for character name.
   * @param {string} status - The status filter.
   * @param {string} location - The location filter.
   * @param {string} gender - The gender filter.
   * @param {string} species - The species filter.
   * @param {string} type - The type filter.
   */
  const fetchCharacter = async (
    page = 1,
    name = '',
    status = '',
    location = '',
    gender = '',
    species = '',
    type = ''
  ) => {
    setLoading(true)
    Api.getCharacters(page, name, status, location, gender, species, type)
      .then((res) => {
        setData(res)
        setPage(page)
        setLoading(false)
        const results = res.results
        getFiltersList(results)
      })
      .catch((error) => {
        setLoading(false)
        console.error(error)
      })
  }

  // Initial data fetch on component mount
  useEffect(() => {
    fetchCharacter(1)
  }, [])

  /**
   * Handles page change event for pagination.
   *
   * @param {number} clickedPage - The clicked page number.
   */
  const handlePageChange = (clickedPage) => {
    if (clickedPage !== page) {
      fetchCharacter(clickedPage)
    }
  }

  /**
   * Handles search input change and triggers character fetch.
   *
   * @param {Object} e - The input change event.
   */
  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    fetchCharacter(1, value, status, location, gender, species, type)
  }

  // Debounced search callback to avoid frequent API calls
  const handleSearchCallback = useCallback(_.debounce(handleSearch, 400), [
    search,
  ])

  /**
   * Handles filter change based on character status.
   *
   * @param {Object} e - The filter change event.
   */
  const handleFilterWithStatus = (e) => {
    const value = e.target.value
    setStatus(value)
    fetchCharacter(1, search, value, location, gender, species, type)
  }

  /**
   * Handles filter change based on character location.
   *
   * @param {Object} e - The filter change event.
   */
  const handleFilterWithLocation = (e) => {
    const value = e.target.value
    setLocation(value)
    fetchCharacter(1, search, status, value, gender, species, type)
  }

  /**
   * Handles filter change based on character gender.
   *
   * @param {Object} e - The filter change event.
   */
  const handleFilterWithGender = (e) => {
    const value = e.target.value
    setGender(value)
    fetchCharacter(1, search, status, location, value, species, type)
  }

  /**
   * Handles filter change based on character species.
   *
   * @param {Object} e - The filter change event.
   */
  const handleFilterWithSpecies = (e) => {
    const value = e.target.value
    setSpecies(value)
    fetchCharacter(1, search, status, location, gender, value, type)
  }

  /**
   * Handles filter change based on character type.
   *
   * @param {Object} e - The filter change event.
   */
  const handleFilterWithType = (e) => {
    const value = e.target.value
    setType(value)
    fetchCharacter(1, search, status, location, gender, species, value)
  }

  /**
   * Clears all applied filters and fetches initial character data.
   */
  const clearFilters = () => {
    fetchCharacter()
    setStatus('')
    setLocation('')
    setGender('')
    setSpecies('')
    setType('')
  }

  return (
    <div>
      <div className="homeTopContainer">
        <div className="homeTopWrapper">
          <div className="homeSearchContainer">
            <Search onChange={handleSearchCallback} />
          </div>
          {(loading && data && data.length === 0) || !data ? (
            <img style={{ padding: '50px' }} src={noresult} alt="No Result" />
          ) : (
            <div className="filtersComponent">
              <div
                style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
              >
                <div>Filters:</div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="filterOpenBtn"
                >
                  {isFilterOpen ? 'Hide' : 'Show'}
                </button>
              </div>
              {isFilterOpen ? (
                <>
                  <Select
                    items={filtersList.status}
                    placeHolder={'Select status'}
                    value={status}
                    handleChange={handleFilterWithStatus}
                  />
                  <Select
                    items={filtersList.location}
                    placeHolder={'Select location'}
                    value={location}
                    handleChange={handleFilterWithLocation}
                  />
                  <Select
                    items={filtersList.gender}
                    placeHolder={'Select gender'}
                    value={gender}
                    handleChange={handleFilterWithGender}
                  />
                  <Select
                    items={filtersList.species}
                    placeHolder={'Select species'}
                    value={species}
                    handleChange={handleFilterWithSpecies}
                  />
                  <Select
                    items={filtersList.type}
                    placeHolder={'Select type'}
                    value={type}
                    handleChange={handleFilterWithType}
                  />
                  <div onClick={clearFilters} id="clear">
                    Clear filters
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <div className="homeCardContainer">
        {!loading && data ? (
          data.results.map((item) => (
            <Link
              key={item.id}
              to={`/charecter/${item.id}`}
              style={{ textDecoration: 'none', color: 'initial' }}
            >
              <Card item={item} />
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <div className="homePaginationContainer">
        {!loading && data ? (
          <Pagination
            totalPage={data.info.pages}
            currentPage={page}
            handlePageChange={handlePageChange}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Home
