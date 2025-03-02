document.addEventListener('DOMContentLoaded', function () {
    // Function to handle AI form submission
    document.getElementById('aiForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the user's input
        const userInput = document.getElementById('prompt').value;

        // Create the JSON object
        const data = {
            user_input: userInput
        };

        try {
            // Send a POST request to the endpoint
            const response = await fetch('http://127.0.0.1:5000/userresponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle the response from the server
            const result = await response.json();
            document.getElementById('response').innerText = JSON.stringify(result, null, 2);
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('response').innerText = 'Error: ' + error.message;
        }
    }
    );
});

// Your existing initMap function and other code
function initMap() {
    // Default location (in case geolocation fails)
    var defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York City

    // Initialize the map with the default location
    var map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12
    });

    // Add traffic layer to the map
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

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

    map.setOptions({ styles: lightTheme });

    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                getWeatherForecast(userLocation.lat, userLocation.lng)

                // Update the map center and add a marker at user's location
                map.setCenter(userLocation);
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "You are here"
                });

                // Specify the destination
                var destination = "Times Square, New York"; // You can replace with input or lat/lng

                // Calculate travel time
                calculateTravelTime(userLocation, destination, map);
            },
            function () {
                alert("Geolocation failed. Using default location.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function calculateTravelTime(origin, destination, map) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };

    try {
        const result = await directionsService.route(request);
        directionsRenderer.setDirections(result);

        // Get and display travel time
        const duration = result.routes[0].legs[0].duration.text;

    } catch (error) {

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

