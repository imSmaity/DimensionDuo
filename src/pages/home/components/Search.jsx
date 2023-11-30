import search from '../../../assets/search.png'
import './style.css'

const Search = ({ value, onChange }) => {
  return (
    <div className="searchContainer">
      <button>
        <img src={search} alt="Search" />
      </button>
      <input
        type="search"
        className="search"
        value={value}
        placeholder="Search charecter..."
        onChange={onChange}
      />
    </div>
  )
}

export default Search
