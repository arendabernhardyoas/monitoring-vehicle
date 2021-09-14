let map2;
let layerTruck2 = new L.featureGroup();
function init2(){
   map2 = new L.map(document.getElementById('map-2'),{
     center:[-6.891231, 107.610745],
     zoom:12
   });
   const contentStringDC = '<div id="content">'+
     '<div id="siteNotice"></div>'+
     '<h1 id="firstHeading" class="firstHeading">Distribution Center</h1>'+
     '<div id="bodyContent">'+
     '<p><b>Distribution Center</b></p>'+
     '</div>'+
     '</div>';
   const iconMarkerDC = L.icon({iconUrl: '', iconSize: [25,41]});
   const markerdc = L.marker([/*latitude,longitude*/], {icon: iconMarkerDC});
   markerdc.addTo(map2);
   markerdc.bindPopup(contentStringDC);
   const layerMap = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
   layerMap.addTo(map2);
   loadData2();
}

function loadData2(){
    layerTruck2.clearLayers();
    let routeTruckCoordinates = [];
    $.ajax({
      type : "GET",
      data : "",
      async: false,
      url  : "loadData2?date_time1="+$("[name='date1']").val()+"&date_time2="+$("[name='date2']").val(),
      success : function(result){
        $.each(result,function(key, val){
          function toIsoString(date) {
            let tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num) {
              let norm = Math.floor(Math.abs(num));
              return (norm < 10 ? '0' : '') + norm;
            };
            return date.getFullYear() +
              '-' + pad(date.getMonth() + 1) +
              '-' + pad(date.getDate()) +
              ' ' + pad(date.getHours()) +
              ':' + pad(date.getMinutes()) +
              ':' + pad(date.getSeconds());
          }
          let dt = new Date(val['date_time']);
          let date_time = toIsoString(dt);
          let longitude = parseFloat(val['longitude']);
          let latitude = parseFloat(val['latitude']);
          let vehicle_reg_num = val['vehicle_reg_num'];
          let fleet_num = val['fleet_num'];
          let staff_id = val['staff_id'];
          let storage_temp = val['storage_temp'];
          let engine_temp = val['engine_temp'];
          let velocity = val['velocity'];
          if(latitude!=-0&&longitude!=0){
            let contentStringTruck = '<div id="content">'+
              '<div id="siteNotice"></div>'+
              '<h1 id="firstHeading" class="firstHeading">Fleet '+fleet_num+'</h1>'+
              '<div id="bodyContent">'+
              '<p><b>Date & Time: </b>'+date_time+'<br>'+
              '<b>Vehicle Reg Num: </b>'+vehicle_reg_num+'<br>'+
              '<b>Fleet Num: </b>'+fleet_num+'<br>'+
              '<b>Lat: </b>'+latitude+'\t\t'+
              '<b>Long: </b>'+longitude+'<br>'+
              '<b>Staff ID: </b>'+staff_id+'<br>'+
              '<b>Velocity: </b>'+velocity+' km/h<br>'+
              '<b>Storage Temp: </b>'+storage_temp+' &#8451<br>'+
              '<b>Engine Temp: </b>'+engine_temp+' &#8451<br>'+
              '</p>'+
              '</div>'+
              '</div>';
            const iconMarkerTruck = L.icon({ iconUrl: '', iconSize: [25,41]});
            let markertruck = new L.marker([latitude,longitude]);
            markertruck.addTo(layerTruck2);
            markertruck.bindPopup(contentStringTruck);
            routeTruckCoordinates.push([latitude, longitude]);
            let polylineTruck = new L.polyline(routeTruckCoordinates,{color: '#FF0000'});
            polylineTruck.addTo(layerTruck2);
          }
          else {
            return;
          }
        });
      }
    });
layerTruck2.addTo(map2);
}

L.DomEvent.on(window, 'load', init2, this);

