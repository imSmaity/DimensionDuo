import search from '../../../assets/search.png'
import './style.css'

/**
 * Functional component representing a search input.
 *
 * @param {string} props.value - The current value of the search input.
 * @param {function} props.onChange - Callback function triggered on input change.
 * @returns {JSX.Element} - Returns JSX representing the Search component.
 */

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
