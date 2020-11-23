mapboxgl.accessToken =
'pk.eyJ1IjoibG9nYXJrIiwiYSI6ImNrZ2lrcjhyejBwOHgzMHRlZW14MTlqem8ifQ.qw3aCcfiIWESeGN3kfTdXg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 13,
  center: [
    45.339835, 2.045389]
});



// Fetch stores from API
async function getPlaces() {
  const res = await fetch('/api/v1/places');
  const data = await res.json();

  const places = data.data.map(place => {

    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          place.storeLocation1,
          place.storeLocation2
        ]
      },
      
      properties: {
        place_name: place.storeName,
        place_address: place.storeType,
        plase_manager: place.storeMname
        
      }
    };
  });
  
  console.log(places)
  loadMap(places);
}

// Load map with stores
function loadMap(places) {
  for (i = 0; i < places.length; i++) {
  var popup = new mapboxgl.Popup()
  .setHTML(`<h2>${places[i].properties.place_name}</h2><p>${places[i].properties.place_address}, manager: ${places[i].properties.plase_manager}</p> `);
  
  var cls = ''
  if(places[i].properties.place_address == 'Store'){

    cls = 'red'
  }
  
  var marker = new mapboxgl.Marker({color:cls })
     
    .setLngLat([places[i].geometry.coordinates[0], places[i].geometry.coordinates[1]])
    .setPopup(popup)
    .addTo(map);
  }
  // map.on('load', function() {
  //   map.addLayer({
  //     id: 'points',
  //     type: 'symbol',
  //     source: {
  //       type: 'geojson',
  //       data: {
  //         type: 'FeatureCollection',
  //         features: stores
  //       }
  //     },
  //     layout: {
  //       'icon-image': '{icon}-15',
  //       'icon-size': 1.5,
  //       'text-field': '{place_name}',
  //       'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  //       'text-offset': [0, 0.9],
  //       'text-anchor': 'top'
  //     }
  //   });
  // });
}



getPlaces();
