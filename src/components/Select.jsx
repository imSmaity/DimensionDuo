import './styles/select.styles.css'

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
