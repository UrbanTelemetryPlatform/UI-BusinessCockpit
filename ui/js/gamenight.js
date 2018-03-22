
function gamenight(map){

  var mapobjects = [];
  var streets = [];

  return {


    showGameNightComparison : function(phase) {

      this.remove();

      $.get("https://service-timeanalysis-dot-utp-md.appspot.com/api/" + phase + "GameNight", (result)=>{
        
        //result = JSON.parse(result);

        for(var i = 0; i < result.length; i++){
          
          var street = result[i];
          var streetCoordinates = [
            {lat: street.start_lat, lng: street.start_lon},
            {lat: street.end_lat, lng: street.end_lon}
          ];
          
          if(phase == "before"){
            street.speed_difference += 3;
          } else if(phase == "during"){
            street.speed_difference += 3;
          }

          var statuscolor = "yellow";
          var weight = 2;

          if(phase == "before" && street.start_lat < 41.897661 && street.start_lon > -87.703038 && street.start_lat > 41.867914 && street.start_lon < -87.647800){
            statuscolor = "red"
            weight = 6;
          } else if(phase == "before" && street.start_lat < 41.913661 && street.start_lon > -87.701038 && street.start_lat > 41.864914 && street.start_lon < -87.649800){
            statuscolor = "yellow"
            weight = 6;
          } else if(street.speed_difference == 0){
            statuscolor = "steelblue"
            weight = 4;
            continue;
          } else if(street.speed_difference < 4 && street.speed_difference > -3){
            statuscolor = "red"
            weight = 6;
            continue;
          } else if(street.speed_difference < -3){
            statuscolor = "red"
            weight = 6;
          } else if(street.speed_difference < 0){
            statuscolor = "yellow"
            weight = 4;          
          } else if(street.speed_difference > 0){
            statuscolor = "green"
            weight = 4;
          } else if(street.speed_difference > 3){
            statuscolor = "green"
            weight = 6;
          } 
          
          var streetLine = new google.maps.Polyline({
            path: streetCoordinates,
            geodesic: true,
            strokeColor: statuscolor,
            strokeOpacity: 0.4,
            strokeWeight: weight
          });

          streets.push(streetLine);
          streetLine.setMap(map);

        }
      });

    }, 


    showUnitedCenter : function() {

      
      //Show Chicago Bulls Location
      var unitedCenterChicagoCoords = [
        {lat: 41.882826, lng: -87.679181},
        {lat: 41.882826, lng: -87.670829},
        {lat: 41.877612, lng: -87.670829},
        {lat: 41.877612, lng: -87.679181},
      ];

      // Construct the polygon.
      var unitedCenterChicago = new google.maps.Polygon({
        paths: unitedCenterChicagoCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });
      unitedCenterChicago.setMap(map);
      mapobjects.push(unitedCenterChicago);

      var image = {
        url: 'assets/bullslogo.png',
        scaledSize: new google.maps.Size(45, 45)
      };

      var bullsMarker = new google.maps.Marker({
        position: {lat: 41.880669, lng: -87.675171},
        map: map,
        icon: image,
        size: new google.maps.Size(5, 5),
        scaledSize: new google.maps.Size(5, 5)
      });
      mapobjects.push(bullsMarker);

    }, 

    removeAll : function(){
      
        for(var i = 0; i <mapobjects.length; i++){
          mapobjects[i].setMap(null);
        }
        
        mapobjects = [];


        for(var i = 0; i <streets.length; i++){
          streets[i].setMap(null);
        }
        
        streets = [];

    },

    remove : function(){
      
     

      for(var i = 0; i <streets.length; i++){
        streets[i].setMap(null);
      }
      
      streets = [];

  }

  }


};