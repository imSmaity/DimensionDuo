import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../../APi'
import Loading from '../../components/Loading'
import Episode from './components/Episode'
import './style.css'

/**
 * Functional component representing the profile page for a character.
 *
 * @returns {JSX.Element} - Returns JSX representing the Profile component.
 */
const Profile = () => {
  // State Hooks
  const [character, setCharacter] = useState(null)
  const [episodes, setEpisodes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [origin, setOrigin] = useState(null)
  const [location, setLocation] = useState(null)
  const [episodeLoading, setEpisodeLoading] = useState(true)

  // Extracting character ID from the URL
  const { id } = useParams()

  // Fetch character details, origin, location, and episodes on component mount
  useEffect(() => {
    Api.getCharacter(id)
      .then((res) => {
        if (res) {
          setCharacter(res)
          setLoading(false)

          // Fetch origin details if available
          if (res.origin.url) {
            const originID = res.origin.url.match(/\d+$/)[0]
            Api.getLocation(originID)
              .then((originRes) => {
                setOrigin(originRes)
              })
              .catch((error) => {
                console.error(error)
                setLoading(false)
              })
          }

          // Fetch location details if available
          if (res.location.url) {
            const locationID = res.location.url.match(/\d+$/)[0]
            Api.getLocation(locationID)
              .then((locationRes) => {
                setLocation(locationRes)
              })
              .catch((error) => {
                console.error(error)
                setLoading(false)
              })
          }

          // Fetch episodes details
          const episodes = res.episode.map((url) =>
            Api.getEpisode(url.match(/\d+$/)[0])
          )

          // Use Promise.all to wait for all episode requests to resolve
          Promise.all(episodes)
            .then((episodesRes) => {
              setEpisodes(episodesRes)
              setEpisodeLoading(false)
            })
            .catch((error) => {
              console.error(error)
              setEpisodeLoading(false)
            })
        } else {
          throw new Error('Character fetching failed')
        }
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [id])

  // JSX Structure
  return (
    <div className="profileContainer">
      <div className="profileWrapper">
        {!loading && character ? (
          <>
            {/* Display character information */}
            <img src={character.image} alt="avatar" id="avatar" />
            <div className="avatarName">{character.name}</div>
            {/* Display character details using Info component */}
            <div className="infoContainer">
              <Info label={'Status:'} value={character.status} />
              <Info label={'Species:'} value={character.species} />
              <Info label={'Gender:'} value={character.gender} />
              {/* Display origin details if available */}
              {origin ? (
                <div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: '20px',
                      paddingTop: '12px',
                    }}
                  >
                    Origin Details
                  </div>
                  {/* Display origin details using Info component */}
                  <Info label={'Name:'} value={origin.name} />
                  <Info label={'Type:'} value={origin.type} />
                  <Info label={'Dimension:'} value={origin.dimension} />
                  <Info label={'Residents:'} value={origin.residents.length} />
                </div>
              ) : null}
              {/* Display location details if available */}
              {location ? (
                <div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: '20px',
                      paddingTop: '12px',
                    }}
                  >
                    Location Details
                  </div>
                  {/* Display location details using Info component */}
                  <Info label={'Name:'} value={location.name} />
                  <Info label={'Type:'} value={location.type} />
                  <Info label={'Dimension:'} value={location.dimension} />
                  <Info
                    label={'Residents:'}
                    value={location.residents.length}
                  />
                </div>
              ) : null}
              {/* Display episodes information */}
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '20px',
                  paddingTop: '12px',
                }}
              >
                Episodes
              </div>
              <div className="episodes">
                {/* Display episodes using Episode component */}
                {!episodeLoading && episodes
                  ? episodes.map((episode) => (
                      <Episode key={episode.id} item={episode} />
                    ))
                  : null}
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

const Info = ({ label, value }) => {
  return (
    <div className="profileInfoComponent">
      <div>{label}</div>
      <div>{value}</div>
    </div>
  )
}

export default Profile
