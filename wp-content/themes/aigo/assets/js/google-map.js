
var google;

function init() {

    // This code's part was added by D.C.Hunter
    // So far, there isn't a Google Map API-Key, Used iframe
    let address1 = 'New York'
    realAddress1 = `https://maps.google.com/maps?q=${address1}&t=m&z=14&output=embed&iwloc=near`;
    
    let iframe = document.getElementById("map1");
    iframe.src = realAddress1;

    let a = document.getElementsByClassName("map-link1");
    for(let i=0;i<a.length;i++)     
      a[i].href = `https://maps.google.com/maps?z=14&t=m&hl=en-US&gl=US&mapclient=embed&q=${address1}`;


    /* This code's part is original, but just now marked until We'll have a Google Map API-Key
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 7,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    var addresses = ['New York'];

    for (var x = 0; x < addresses.length; x++) {
        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function (data) {
            var p = data.results[0].geometry.location
            var latlng = new google.maps.LatLng(p.lat, p.lng);
            new google.maps.Marker({
                position: latlng,
                map: map,
                icon: 'images/loc.png'
            });

        });
    }
    */
    
}
google.maps.event.addDomListener(window, 'load', init);