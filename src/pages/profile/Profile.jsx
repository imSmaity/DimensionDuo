import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../../APi'
import Loading from '../../components/Loading'
import Episode from './components/Episode'
import './style.css'

const Info = ({ label, value }) => {
  return (
    <div className="profileInfoComponent">
      <div>{label}</div>
      <div>{value}</div>
    </div>
  )
}

const Profile = () => {
  const [charecter, setCharecter] = useState(null)
  const [episodes, setEpisodes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [origin, setOrigin] = useState(null)
  const [location, setLocation] = useState(null)
  const [episodeLoading, setEpisodeLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    Api.getCharacter(id)
      .then((res) => {
        if (res) {
          setCharecter(res)
          setLoading(false)
          console.log(res)

          const episodes = res.episode.map((url) =>
            Api.getEpisode(url.match(/\d+$/)[0])
          )

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
          throw new Error('Charecter fetching filed')
        }
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="profileContainer">
      <div className="profileWrapper">
        {!loading && charecter ? (
          <>
            <img src={charecter.image} alt="avatar" id="avatar" />
            <div className="avatarName">{charecter.name}</div>
            <div className="infoContainer">
              <Info label={'Status:'} value={charecter.status} />
              <Info label={'Species:'} value={charecter.species} />
              <Info label={'Gender:'} value={charecter.gender} />
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
                  <Info label={'Name:'} value={origin.name} />
                  <Info label={'Type:'} value={origin.type} />
                  <Info label={'Dimension:'} value={origin.dimension} />
                  <Info label={'Residents:'} value={origin.residents.length} />
                </div>
              ) : null}
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
                  <Info label={'Name:'} value={location.name} />
                  <Info label={'Type:'} value={location.type} />
                  <Info label={'Dimension:'} value={location.dimension} />
                  <Info
                    label={'Residents:'}
                    value={location.residents.length}
                  />
                </div>
              ) : null}
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

export default Profile
