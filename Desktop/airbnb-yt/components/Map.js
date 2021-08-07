import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter  from "geolib/es/getCenter";

function Map({ searchResults }) {
  //Transform

  const [selectedLocation,setSelectedLocation] = useState({});








  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/ypos/cks25dm8fe8uw17p4ckrfa4hi"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}>
      
      
      {searchResults.map((result)  => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
            >
            <p 

            role="img"
            onClick={() => setSelectedLocation(result)}
            className="cursor-pointer text-2xl  animate-bounce"
            aria-label="push-pin"
            >🏳️</p>
          </Marker>

        {/* this is a popus when we click on a marker */}

        {selectedLocation.long===result.long ? (
              
               <Popup
                onClose = {
                     () =>
                     setSelectedLocation({}) }
                  
                   closeOnClick={true}
                   latitude={result.lat}
                   longitude={
                       result.long
                   }
                
               >
                    {result.title}
               </Popup>
             
        ):(false)}



        </div>
      ))}





    </ReactMapGL>
  );
}

export default Map;
