import './styles/card.styles.css'

/**
 *
 * @param {Object} item - An object containing information for the card.
 * @returns {JSX.Element} - Returns JSX representing the Card component.
 */

const Card = ({ item }) => {
  return (
    <div className="cardContainer">
      <div className="avatarWrapper">
        <img id="avatar" src={item.image} alt="" />
      </div>
      <p id="name">{item.name}</p>
      <div className="infoContainer">
        <div className="info">
          <p>{item.species}</p>
        </div>
        <div className="info">
          <p>{item.status}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
