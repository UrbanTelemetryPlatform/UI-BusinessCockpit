
function parkandride(map){

  var mapobjects = [];

  return {
    show : function() {

      
      

    

     map.data.setStyle({
        fillColor: 'fuchsia',
        strokeWeight: 10,
        strokeColor : 'fuchsia'
      });

      // Color Capital letters blue, and lower case letters red.
    // Capital letters are represented in ascii by values less than 91
   /* map.data.setStyle(function(feature) {
      return {
        fillColor: 'red',
        strokeWeight: 2
      };
    });
*/
    map.data.loadGeoJson('data/parkandride.json');
    map.data.setMap(map);
  }, 

  remove : function(){
   
    map.data.setMap(null);
    
  }

  };


};