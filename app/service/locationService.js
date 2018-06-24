const config = global.config;
const connector = require('request');

function LocationService(params, callback){
    connector.get({
        headers: {
            'Content-Type': 'application/json',
        },
        url: config.api.address + config.api.endpoint.locations
    },      
    function(err, response, data) {
        if(err){
            callback(err);
        }
        callback(null, filterByParams(params, data));
    });
}

/*Usually the params would be passed to the service/database consult, but how its a static json, this method will filter
the results */
function filterByParams(params, data){
    let locationId = params.locationId;
    data = JSON.parse(data);

    return data[locationId];
}

module.exports.invoke = LocationService;