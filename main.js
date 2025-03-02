

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