# Monitoring Vehicle

## Build interface and data processing vehicle location, velocity and temperature from field instrument.

### Descriptions

* Using NodeJS runtime stack version 14 LTS
* Using LeafletJS [here](https://leafletjs.com)
* Using jQuery [here](https://jquery.com/download/)
* Using MDBootstrap 5 [here](https://mdbootstrap.com/docs/standard/getting-started/installation/)
* Using PostgreSQL

Field instrument can be microcontroller with GPS model and temperature sensor.<br>
Vehicle location, velocity and temperature from field instrument sending data with HTTP request GET method.<br>
String HTTP request GET:<br>
`http://[ip address or domain]:[port]/add?vehicle_reg_num=[vehicle registration number]&fleet_num=[fleet number]&latitude=[latitude value]&longitude=[longitude value]&staff_id=[staff id]&velocity=[velocity value]&storage_temp=[storage temperature value]&engine_temp=[engine temperature value]`<br>

### Result
Main Page<br>
![main-page-1](./images/monitoring-vehicle-1.png)
![main-page-2](./images/monitoring-vehicle-2.png)
HTTP Request GET<br>
![http-request-get](./images/monitoring-vehicle-3.png)
