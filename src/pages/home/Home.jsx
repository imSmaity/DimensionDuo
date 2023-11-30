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

const Home = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [location, setLocation] = useState('')
  const [gender, setGender] = useState('')
  const [species, setSpecies] = useState('')
  const [type, setType] = useState('')
  const [search, setSearch] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [filtersList, setFiltersList] = useState({
    status: [],
    location: [],
    gender: [],
    species: [],
    type: [],
  })

  const getFiltersList = (charecters) => {
    charecters.forEach((charecter) => {
      if (charecter.status && !filtersList.status.includes(charecter.status)) {
        filtersList.status.push(charecter.status)
        setFiltersList({
          ...filtersList,
        })
      }

      if (
        charecter.location.name &&
        !filtersList.location.includes(charecter.location.name)
      ) {
        filtersList.location.push(charecter.location.name)
        setFiltersList({
          ...filtersList,
        })
      }

      if (charecter.gender && !filtersList.gender.includes(charecter.gender)) {
        filtersList.gender.push(charecter.gender)
        setFiltersList({
          ...filtersList,
        })
      }

      if (
        charecter.species &&
        !filtersList.species.includes(charecter.species)
      ) {
        filtersList.species.push(charecter.species)
        setFiltersList({
          ...filtersList,
        })
      }

      if (charecter.type && !filtersList.type.includes(charecter.type)) {
        filtersList.type.push(charecter.type)
        setFiltersList({
          ...filtersList,
        })
      }
    })
  }

  const fetchCharecter = async (
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
        console.log(error)
      })
  }
  useEffect(() => {
    fetchCharecter(1)
  }, [])

  const handlePageChange = (clickedPage) => {
    if (clickedPage !== page) {
      fetchCharecter(clickedPage)
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    fetchCharecter(1, value, status, location, gender, species, type)
  }

  const handleSearchCallback = useCallback(_.debounce(handleSearch, 400), [
    search,
  ])

  const handleFilterWithStatus = (e) => {
    const value = e.target.value
    setStatus(value)
    fetchCharecter(1, search, value, location, gender, species, type)
  }

  const handleFilterWithLocation = (e) => {
    const value = e.target.value
    setLocation(value)
    fetchCharecter(1, search, status, value, gender, species, type)
  }

  const handleFilterWithGender = (e) => {
    const value = e.target.value
    setGender(value)
    fetchCharecter(1, search, status, location, value, species, type)
  }

  const handleFilterWithSpecies = (e) => {
    const value = e.target.value
    setSpecies(value)
    fetchCharecter(1, search, status, location, gender, value, type)
  }

  const handleFilterWithType = (e) => {
    const value = e.target.value
    setType(value)
    fetchCharecter(1, search, status, location, gender, species, value)
  }

  const clearFilters = () => {
    fetchCharecter()
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
