let map1;
let layerTruck1 = new L.layerGroup();

function init1(){
   map1 = new L.map(document.getElementById('map-1'),{
     center:[-6.891231, 107.610745],
     zoom:13
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
   markerdc.addTo(map1);
   markerdc.bindPopup(contentStringDC);
   const layerMap = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
   layerMap.addTo(map1);
   setInterval('loadData1()',10000);
}

function loadData1(){
layerTruck1.clearLayers();
let vehicle_reg_num;
let fleet_num;
let latitude1;
let longitude1;
let staff_id;
let velocity;
let storage_temp;
let engine_temp;
let date_time;
let latitude2;
let longitude2;
   $.ajax({
     type : "GET",
     data : "",
     async: false,
     url  : "loadData1",
     success : function(result){
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
       let dt = new Date(result[0].date_time);
       date_time = toIsoString(dt);
       vehicle_reg_num = result[0].vehicle_reg_num;
       fleet_num = result[0].fleet_num;
       latitude1 = result[0].latitude;
       longitude1 = result[0].longitude;
       staff_id = result[0].staff_id;
       velocity = result[0].velocity;
       storage_temp = result[0].storage_temp;
       engine_temp = result[0].engine_temp;
       latitude2=parseFloat(latitude1);
       longitude2=parseFloat(longitude1);
     }
   });
let contentStringTruck = '<div id="content">'+
   '<div id="siteNotice"></div>'+
   '<h1 id="firstHeading" class="firstHeading">Fleet '+fleet_num+'</h1>'+
   '<div id="bodyContent">'+
   '<p><b>Date & Time: </b>'+date_time+'<br>'+
   '<b>Vehicle Reg Num: </b>'+vehicle_reg_num+'<br>'+
   '<b>Fleet Num: </b>'+fleet_num+'<br>'+
   '<b>Lat: </b>'+latitude1+'\t\t'+
   '<b>Long: </b>'+longitude1+'<br>'+
   '<b>Staff ID: </b>'+staff_id+'<br>'+
   '<b>Velocity: </b>'+velocity+' km/h<br>'+
   '<b>Storage Temp: </b>'+storage_temp+' &#8451<br>'+
   '<b>Engine Temp: </b>'+engine_temp+' &#8451<br>'+'</p>'+
   '</div>'+
   '</div>';
const iconMarkerTruck = L.icon({ iconUrl: '', iconSize: [25,41]});
let markertruck = new L.marker([latitude2,longitude2], {icon: iconMarkerTruck});
markertruck.bindPopup(contentStringTruck);
markertruck.addTo(layerTruck1);

layerTruck1.addTo(map1);
}

L.DomEvent.on(window, 'load', init1, this);
