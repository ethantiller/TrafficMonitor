

function initMap() {
    // Default location (in case geolocation fails)
    var defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York City

    var map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12
    });

    var trafficLayer = new google.maps.TrafficLayer();

    const lightTheme = [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                { "color": "#f5f5f5" } // Light gray background
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                { "color": "#616161" } // Medium gray text
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                { "visibility": "off" } // Hide points of interest
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                { "color": "#ffffff" } // White roads
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                { "color": "#c9e9f6" } // Light blue water
            ]
        }
    ];

    trafficLayer.setMap(map);

    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                getWeatherForecast(userLocation.lat, userLocation.lng);

                // Update map center
                map.setCenter(userLocation);

                // Add a marker at user's location
                new google.maps.Marker({
                    origin: userLocation,
                    position: userLocation,
                    center: userLocation,
                    map: map,
                    title: "You are here"
                });
            },
            function () {
                alert("Geolocation failed. Using default location.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}



async function getWeatherForecast(lat, lon) {
    const apiUrl = `https://api.weather.gov/points/${lat},${lon}`;

    try {
        // Fetch the initial data to get the forecast URL

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        

        const data = await response.json();

        const forecastUrl = data.properties.forecast;
        console.log(`Forecast URL: ${forecastUrl}`);

        // Fetch the forecast data

        // const response = await fetch(file); // Waits until the fetch is complete
        // const data = await response.json();


        const forecastResponse = await fetch(forecastUrl);
       
        
        const forecastData = await forecastResponse.json();

        const forecast = forecastData.properties.periods[0];
        console.log(`Forecast: ${forecast.detailedForecast}`);

        // Display the forecast on the webpage
        document.getElementById('forecast').innerText = `Forecast: ${forecast.detailedForecast}`;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        document.getElementById('forecast').innerText = `Error: ${error.message}`;
    }
}

// Example usage
const LAT = 40.7128;
const LON = -74.0060;  // New York City






        // var destination = "Times Square, New York"; // You can replace with input or lat/lng

        // calculateTravelTime(userLocation, destination, map);
        // // Calculate travel time
        // function calculateTravelTime(origin, destination, map) {
        //     var directionsService = new google.maps.DirectionsService();
        //     var directionsRenderer = new google.maps.DirectionsRenderer();
        //     directionsRenderer.setMap(map);

        //     var request = {
        //         origin: origin,
        //         destination: destination,
        //         travelMode: google.maps.TravelMode.DRIVING
        //     };

        //     directionsService.route(request, function (result, status) {
        //         if (status === google.maps.DirectionsStatus.OK) {
        //             directionsRenderer.setDirections(result);

        //             // Get and display travel time
        //             var duration = result.routes[0].legs[0].duration.text;
        //             alert("Travel time: " + duration);
        //         } else {
        //             alert("Error calculating travel time: " + status);
        //         }
        //     });
        // }