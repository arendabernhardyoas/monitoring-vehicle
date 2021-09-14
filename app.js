const http = require('http');
const fs = require('fs');
const path = require('path');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'vehicle@monitoring-vehicle',
  host: 'monitoring-vehicle.postgres.database.azure.com',
  database: 'monitoring_vehicle',
  password: 'AnyTh!ngy0uW@nT',
  port: 5432,
  ssl: require
});
/*
**localhost database connection
**const pool = new Pool({
**  user: 'aby',
**  host: 'localhost',
**  database: 'monitoring_vehicle',
**  password: 'AnyTh!ngy0uW@nT',
**  port: 5432
**});
*/

function send404(res) {
 res.writeHead(404, { 'Content-Type': 'text/plain' });
 res.write('Error 404: Resource not found.');
 res.end();
}

const mimeLookup = {
 '.js': 'application/javascript',
 '.html': 'text/html',
 '.css' : 'text/css',
 '.gif' : 'image/gif',
 '.jpeg' : 'image/jpeg',
 '.jpg' : 'image/jpg',
 '.png' : 'image/png'
};

const querystring = require('querystring');
const url = require('url');

http.createServer(function (req, res) {

let pathname = url.parse(req.url).pathname;

if (req.method === 'GET' && pathname === '/add') {
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
  let dt = new Date();
  let date_time = toIsoString(dt);
  let parsed = url.parse(req.url);
  let query = querystring.parse(parsed.query);
  let vehicle_reg_num = query['vehicle_reg_num'];
  let fleet_num = query['fleet_num'];
  let latitude = query['latitude'];
  let longitude = query['longitude'];
  let staff_id = query['staff_id'];
  let velocity = query['velocity'];
  let storage_temp = query['storage_temp'];
  let engine_temp = query['engine_temp'];
  pool.query(
    "INSERT INTO monitoring_report_vehicle(date_time,vehicle_reg_num, fleet_num, latitude, longitude, staff_id, velocity, storage_temp, engine_temp) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [date_time,vehicle_reg_num,fleet_num,latitude,longitude,staff_id,velocity,storage_temp,engine_temp],
    function (error, results) {
      if (error) { throw error;
      }
      res.writeHead(200);
      res.end();
    }
  );
}


else if (req.method === 'GET' && pathname === '/loadData1') {
  let parsed = url.parse(req.url);
  let query = querystring.parse(parsed.query);
  let microcontroller_labs = query['microcontroller_labs'];
  pool.query(
    "SELECT * FROM monitoring_report_vehicle ORDER BY date_time DESC LIMIT 1",
    [],
    function (error, results) {
      if (error) { throw error;
      }
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.end(JSON.stringify(results.rows));
    }
  );
}

else if (req.method === 'GET' && pathname === '/loadData2') {
  let parsed = url.parse(req.url);
  let query = querystring.parse(parsed.query);
  let date_time1 = query['date_time1'];
  let date_time2 = query['date_time2'];
 if (date_time1 != '' && date_time2 != ''){
  pool.query(
    "SELECT * FROM monitoring_report_vehicle WHERE date_time::text BETWEEN $1 AND $2",
    [date_time1,date_time2],
    function (error, results) {
      if (error) { throw error;
      }
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.end(JSON.stringify(results.rows));
    }
  );
 }
 else {
  pool.query(
    "SELECT * FROM monitoring_report_vehicle ORDER BY date_time DESC LIMIT 1",
    [],
    function (error, results) {
      if (error) { throw error;
      }
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.end(JSON.stringify(results.rows));
    }
  );
 }
}

else if (req.method === 'GET') {
 // resolve file path to filesystem path
 let fileurl;
 if (req.url == '/') fileurl = '/index.html';
 else fileurl = req.url;
 let filepath = path.resolve('./public/' + fileurl);
 // lookup mime type
 let fileExt = path.extname(filepath);
 let mimeType = mimeLookup[fileExt];
 if (!mimeType) {
   send404(res);
   return;
 }
 // see if we have that file
 fs.exists(filepath, function (exists) {
 // if not
   if (!exists) {
     send404(res);
      return;
   };
 // finally stream the file
   res.writeHead(200, { 'content-type': mimeType });
   fs.createReadStream(filepath).pipe(res);
 });
}

else {
 send404(res);
}

}).listen(process.env.PORT || 8081);

/*
**https with self sign cert and redirect https
**
**const https = require('https');
**
**const options = {
**  key: fs.readFileSync('/etc/ssl/private/server.key'),
**  cert: fs.readFileSync('/etc/ssl/private/server.crt')
**};
**
**https.createServer(options, function (req, res) {
**
**main web app
**
**}).listen(443);
**
**http.createServer(function (req, res) {
**
** res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
** res.end();
**
**}).listen(80);
*/
