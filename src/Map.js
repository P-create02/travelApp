import React from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api"
import "@reach/combobox/styles.css"
import mapStyle from './MapStyle'

const libraries = ["places"]

const mapContainerStyle = {
  height: "63vh",
  width: "100vw",
}

const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
}

export default function Map({coordinates}) {
    const center = {
        lat: coordinates.lat,
        lng: coordinates.lng,
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAP,
        libraries,
    })

    if(loadError) return 'Error loading map'
    if(!isLoaded) return <div className="loading"></div>

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options}>
                <Marker key={Marker.toString()} position={{lat: center.lat, lng: center.lng}} />
            </GoogleMap>
        </div>
    )
}
