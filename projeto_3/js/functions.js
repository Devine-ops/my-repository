window.onload = function(){
    var map;
    function initialize(){
        var mapProp = {
            center: new google.maps.LatLng(-15.874119758605957,-48.059810638427734),
            scroolWhell: false,
            zoom: 20,
            MapTypeId:google.maps.MapTypeId.ROADMAP
        }

        map = new  google.maps.Map(document.getElementById("mapa"),mapProp);
    }

    function addMaker(lat,lng,icon,content,click){
        var latLng = {'lat': lat, 'lng': lng};
        
        var marker = new google.maps.Marker({
            position:latLng,
            map:map,
            icon:icon
        });

        var infoWindow = new google.maps.InfoWindow({
            content:content,
            maxWidth:200,
            pixelOffset: new google.maps.Size(0,20)
        });

        if(click == true){
            google.maps.event.addListener(marker,'click', function(){
                infoWindow.open(map,marker);
            });
        }else{
            infoWindow.open(map,marker);
        }

    }

    initialize();
    addMaker(-15.874119758605957,-48.059810638427734,'','',true);

    setTimeout(function(){
        map.panTo({'lat': -17.001964,'lng':-49.187383});
        map.setZoom(12)
    },4000);
}
    
