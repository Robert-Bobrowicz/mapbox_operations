import './App.css';
import React, {useEffect, useState} from "react";
import ReactMapGL, {Marker} from 'react-map-gl';

function App() {
    const JSON_FILE = "http://localhost:3000/apartments";
    const [apartmentData, setApartmentData] = useState([]);
    const [mapViewPort, setMapViewPort] = useState({
        latitude: 52.231140,
        longitude: 21.004146,
        zoom: 12,
    });
    const style = {
        width: '100vw',
        height: '100vh'
    };


    useEffect(() => {
        fetch(`${JSON_FILE}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setApartmentData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])


  return (
    <div className="App">
        <ReactMapGL
            style = {style}
            mapboxAccessToken = {process.env.REACT_APP_MAP_TOKEN}
            initialViewState = {mapViewPort}
            mapStyle="mapbox://styles/mapbox/streets-v11" //mapbox://styles/mapbox/streets-v9
            onViewportChange = {(newView) => setMapViewPort(newView)}
        >
        <Marker
            longitude={21.007146}
            latitude={52.234150}
            draggable={true}
        >
            <img
                src='https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/location-24-512.png'
                width = {"25px"}
                height = {"25px"}
                alt = "General pin icon"
            />
        </Marker>
            {apartmentData.map((apartment) => {
                return (<Marker
                    key = {apartment.id}
                    latitude={apartment.coordinates[0]}
                    longitude={apartment.coordinates[1]}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                        alt = "apartment icon"
                        width = {"25px"}
                        height = {"25px"}
                    />
                    <div>{apartment.name}</div>
                </Marker>)
            })}
        </ReactMapGL>
    </div>
  );
}

export default App;
