document.addEventListener('DOMContentLoaded', function () {
    let currentRouteSummary = '';
    let currentRouteSteps = '';
    let userLocation = null;
    let map;
    let directionsService;
    let directionsRenderer;

    // Function to handle AI form submission
    document.getElementById('aiForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the user's input
        const userInput = document.getElementById('prompt').value;

        // Append the route information to the user's input
        const fullPrompt = `$Route Information:\nSummary: ${currentRouteSummary}\nSteps:\n${currentRouteSteps}`;

        // Create the JSON object
        const data = {
            user_input: fullPrompt
        };

        try {
            // Send a POST request to the endpoint
            // Add mode and credentials options to fetch
        const response = await fetch('http://127.0.0.1:5000/userresponse', {
            method: 'POST',
            mode: 'cors', // Ensure CORS mode
            credentials: 'same-origin', // Or 'include' if needed
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle the response from the server
            const result = await response.text(); // Get the response as plain text
            document.getElementById('response').innerText = result; // Display the plain text response
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Initialize the map
    initMap();

    // Handle directions form submission
    document.querySelector('.directions-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const destinationInput = document.getElementById('destination').value;

        try {
            // Convert address to coordinates
            const geocoder = new google.maps.Geocoder();
            const { results } = await new Promise((resolve, reject) => {
                geocoder.geocode({ address: destinationInput }, (results, status) => {
                    if (status === 'OK') resolve({ results });
                    else reject(new Error('Geocode failed: ' + status));
                });
            });

            if (results[0]) {
                const destination = results[0].geometry.location;
                calculateAndDisplayRoute(userLocation, destination);
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('directions-panel').innerHTML = `Error: ${error.message}`;
        }
    });

    function initMap() {
        // Default location (in case geolocation fails)
        const defaultLocation = { lat: 39.1031, lng: -84.5120 }; // Cincinnati, OH

        // Initialize the map with the default location
        map = new google.maps.Map(document.getElementById("map"), {
            center: defaultLocation,
            zoom: 12
        });

        // Initialize the DirectionsService and DirectionsRenderer
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        // Try to get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    getWeatherForecast(userLocation.lat, userLocation.lng);

                    // Update the map center and add a marker at user's location
                    map.setCenter(userLocation);
                    new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: "You are here"
                    });
                },
                function () {
                    // Handle error
                    console.log('Geolocation failed, using default location');
                    userLocation = defaultLocation;
                    map.setCenter(defaultLocation);
                }
            );
        } else {
            // Handle case where geolocation is not supported
            userLocation = defaultLocation;
            map.setCenter(defaultLocation);
        }
    }

    function calculateAndDisplayRoute(origin, destination) {
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (response, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);

                    // Extract and store route information
                    const route = response.routes[0];
                    const leg = route.legs[0];
                    currentRouteSummary = leg.distance.text + " to " + leg.end_address;
                    currentRouteSteps = leg.steps.map(step => step.instructions).join("\n");
                    const travelTime = leg.duration.text;

                    // Display route instructions and travel time
                    directionsRenderer.setPanel(document.getElementById('directions-panel'));
                
                    document.getElementById('travelInfo').innerHTML = `
                        <strong>Travel Time:</strong> ${travelTime}<br>
                        <strong>Distance:</strong> ${leg.distance.text}<br>
                        <strong>Destination:</strong> ${leg.end_address}
                    `;
                } else {
                    console.error('Directions request failed: ' + status);
                }
            }
        );
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
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            const forecast = forecastData.properties.periods[0];
            console.log(`Forecast: ${forecast.detailedForecast}`);

            // Display the forecast on the webpage
            document.getElementById('forecast').innerText = `Today's Forecast: ${forecast.detailedForecast}`;
        } catch (error) {
            console.error(`Error: ${error.message}`);
            document.getElementById('forecast').innerText = `Error: ${error.message}`;
        }
    }
});