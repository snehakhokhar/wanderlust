
mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
    projection: 'globe', // display the map as a globe
    zoom: 8, // initial zoom level, 0 is the world view, higher values zoom in
    center: coordinates, // center the map on this longitude and latitude
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });
   console.log(coordinates, "coordinates from show.ejs");
     const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${listing.location}</h4><p>exact location will be provide after booking</p>`))
        .addTo(map);

