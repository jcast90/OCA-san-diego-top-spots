// write your code here
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.750202, lng: -117.129937 },
        zoom: 10
    })



    $.getJSON('data.json', function(data) {

        let name = data.name;
        let description = data.description;
        let link = data.link;

        let tableBody = $('<tbody></tbody>').addClass('tableBody');
        let infoWindow;
        for (let i = 0; i < data.length; i++) {
            let row = $('<tr></tr>').addClass('table-row');
            let colName = $('<td></td>').addClass('table-column').text(data[i].name);
            let colDescription = $('<td></td>').addClass('table-column').text(data[i].description);
            // let colDistance = $('<td></td>').addClass('table-column').text('distance');
            let colLink = $('<td></td>').addClass('table-column').html('<a href="https://www.google.com/maps?q=' + data[i].location[0] + ',' + data[i].location[1] + '" target="_blank"><button class="button is-info">View On Map</button></a>');



            $('.table').append(tableBody);
            $('.table tr').mouseover(function() {
                $(this).addClass('is-selected');
            });

            $('.table tr').mouseout(function() {
                $(this).removeClass('is-selected');
            });


            tableBody.append(row);
            row.append(colName);
            row.append(colDescription);
            row.append(colLink);


            let myLatLng = { lat: data[i].location[0], lng: data[i].location[1] };

            infoWindow = new google.maps.InfoWindow({
                content: data[i].name
            });

            let marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: data[i].name
            });
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });

            marker.setMap(map);
        }



        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // infoWindow.setPosition(pos);
                // // infoWindow.setContent('Found Location');
                // infoWindow.open(map);
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }

    });

    // Try HTML5 geolocation.



}