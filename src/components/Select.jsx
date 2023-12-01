import './styles/select.styles.css'

/**
 * Functional component representing a Select dropdown.
 *
 * @param {Object} props - Properties passed to the Select component.
 * @returns {JSX.Element} - Returns JSX representing the Select component.
 */

const Select = ({ items, placeHolder, handleChange, value }) => {
  return (
    <div className="selectContainer">
      <select onChange={handleChange} value={value}>
        <option value={''}>{placeHolder}</option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
