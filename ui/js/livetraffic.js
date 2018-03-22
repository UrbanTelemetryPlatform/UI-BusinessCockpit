
function livetraffic(map){

  var streets = [];
  var timer;

  return {

    show : function() {

      $.get("https://service-livetraffic-dot-utp-md.appspot.com/api/readWithRoad", (result)=>{
        this.remove();
        result = JSON.parse(result);

        for(var i = 0; i < result.length; i++){
          
          var street = result[i];

//          console.log(result);

          var streetCoordinates = [
            {lat: street.start_lat, lng: street.start_lon},
            {lat: street.end_lat, lng: street.end_lon}
          ];
          
 //         console.log(streetCoordinates);

          var statuscolor = "yellow";
          var weight = 2;
          var opacity = 0.6;

          if(street.speed == -1){
            statuscolor = "steelblue"
            weight = 4;
          } else if(street.speed == 13){
            statuscolor = "yellow"
            weight = 4;
            opacity =1;
          } else if(street.speed < 5){
            statuscolor = "red"
            weight = 6;
          } else if(street.speed < 15){
            statuscolor = "red"
            weight = 4;
          } else if(street.speed >= 15){
            statuscolor = "green"
            weight = 4;
          } else if(street.speed > 25){
            statuscolor = "green"
            weight = 6;
          }  
          
          var streetLine = new google.maps.Polyline({
            path: streetCoordinates,
            geodesic: true,
            strokeColor: statuscolor,
            strokeOpacity: opacity,
            strokeWeight: weight
          });

          streets.push(streetLine);
          streetLine.setMap(map);

        }
      });

    }, 

    refresh : function(time){
      // that = this;
      // timer = setInterval(function(){
      //   apply(that.show(), this);        
      // }, time);
      timer = setInterval(()=>{
        this.show();
      },time)

    },

    stopRefresh : function(){
      if(timer != undefined){
        clearInterval(timer);
        timer = undefined;
      }
    },

    remove : function(){
      for(var i = 0; i < streets.length; i++){
        streets[i].setMap(null);
      }
      
      streets = [];

    }


  };//return


};