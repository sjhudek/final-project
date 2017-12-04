$(document).ready(function () {

    $("#displayListing").toggle();

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.0149856,
            lng: -105.2705456
        },
        zoom: 10,
        mapTypeId: 'terrain',
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    }, {

        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        fullscreenControl: true
    });

    var inpPlace = document.getElementById('place')

    var autocomplete = new google.maps.places.Autocomplete(inpPlace);
    autocomplete.bindTo('bounds', map);


    $('#searchBtn').on('click', function (event) {
        event.preventDefault();

        var searchWhatToDo = $('#whatToDo').val();
        var searchPlaceToGo = $('#place').val();

        var searchTerm = {
            searchWhat: searchWhatToDo,
            searchPlace: searchPlaceToGo
        }


        var resultsArr = [];
        $.post('/search', searchTerm, (dataFromServer) => {
            resultsArr = dataFromServer.map(function (element, index) {

                if (index === 0) {
                    map.setZoom(12);
                    map.setCenter(element.location);
                }

                return (new google.maps.Marker({
                    position: element.location,
                    map: map
                }));

            });

            var displayDetails = new Vue({
                el: '#displayMe',
                data: {
                    dataList: dataFromServer,
                },
            });
        });


        $("#displayListing").toggle();
    });



}); // end of jQ doc ready
