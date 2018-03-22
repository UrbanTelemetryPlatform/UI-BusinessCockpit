
function taxipickup(map){

  var mapobjects = [];
  
  return {


    showTaxiPickupHotspots : function(heatmapparam) {

      this.remove();

      $.get("https://service-timeanalysis-dot-utp-md.appspot.com/api/taxihotspots?limit=500", (result)=>{
        
        //result = JSON.parse(result);
        var heatMapData = [];
        var max;

        for(var i = 0; i < result.length; i++){
          var hotspot = result[i];
          var entry = {
            location: new google.maps.LatLng(hotspot.latitude, hotspot.longitude),
            weight: hotspot[heatmapparam]
          };
          heatMapData.push(entry);
        }

        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatMapData
        });
        heatmap.setMap(map);

        mapobjects.push(heatmap)
       

      });

    }, 


   

    remove : function(){
      
      for(var i = 0; i <mapobjects.length; i++){
        mapobjects[i].setMap(null);
      }
      
      mapobjects = [];

  }

  }


};