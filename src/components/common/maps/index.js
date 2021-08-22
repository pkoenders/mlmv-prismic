import * as React from 'react'
import GoogleMapReact from 'google-map-react'
import linkResolver from '../../../utils/linkResolver'
import { RichText } from 'prismic-reactjs'

import './index.scss'

const LocationPin = ({ description }) => {
  return (
    <div className="pin">
      <i className="material-icons-round" aria-hidden="true">
        place
      </i>
      <RichText render={description} linkResolver={linkResolver} />
    </div>
  )
}

const GoogleMap = ({ geopoint, description, zoomLevel }) => {
  // console.log('lat = ' + geopoint.latitude)
  // console.log('lng = ' + geopoint.longitude)
  // console.log('description = ' + description)
  // console.log('zoomLevel = ' + zoomLevel)

  const location = {
    // address: '110C Linton West End, Palmerston North 4410.',
    // lat: -40.364737,
    // lng: 175.614543,
    //address: description,
    lat: geopoint.latitude,
    lng: geopoint.longitude,
  }

  return (
    // Important! Always set the container height explicitly
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAqtG-6jfYqhE9-yb6A0QYJ1z5onDubltQ' }}
        defaultCenter={location}
        defaultZoom={zoomLevel} // Must be <= 22 - Default 16

        // yesIWantToUseGoogleMapApiInternals={true}
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <LocationPin lat={location.lat} lng={location.lng} description={description} />
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMap
