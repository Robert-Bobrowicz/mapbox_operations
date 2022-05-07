
import React, {useEffect, useState} from "react";
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

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
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [showPopup, setShowPopup] = useState(false);


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

    useEffect(() => {
        console.log(selectedApartment);
        console.log(showPopup);
    }, [selectedApartment, showPopup]);


  return (
    <div className="App">
        <ReactMapGL
            style = {style}
            mapboxAccessToken = {process.env.REACT_APP_MAP_TOKEN}
            initialViewState = {mapViewPort}
            mapStyle= "mapbox://styles/mapbox/streets-v11" //mapbox://styles/mapbox/streets-v9
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
                    <button
                        className = 'icon-btn'
                        onClick = {(e) => {
                            e.preventDefault();
                            setSelectedApartment(apartment);
                            setShowPopup(true);
                            console.log('Marker clicked');
                        }}
                    >
                        <img
                            src = "./icons/location-pin.png"
                            alt = "apartment icon"
                        />

                    </button>
                    <div style={{fontWeight: '550'}}>{apartment.name}</div>
                </Marker>)
            })}

            { showPopup && (
                    <Popup
                        longitude = {selectedApartment.coordinates[1]}
                        latitude = {selectedApartment.coordinates[0]}
                        anchor="bottom"
                        closeOnClick={false}
                        closeOnMove={false}
                        onClose ={() => setShowPopup(false)}
                    >
                        <div style = {{width: '120px', height: '25px'}}>You are welcome to {selectedApartment.name}</div>
                    </Popup>)
            }
        </ReactMapGL>
    </div>
  );
}

export default App;
