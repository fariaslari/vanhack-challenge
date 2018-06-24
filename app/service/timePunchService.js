const config = global.config;
const connector = require('request');

function TimePunchService(params, callback){
    connector.get({
        headers: {
            'Content-Type': 'application/json',
        },
        url: config.api.address + config.api.endpoint.timePunch
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
    let userId = params.userId;
    data = JSON.parse(data);

    let arr = Object.keys(data).map((key)=>{
        if(data[key].userId == userId)
            return data[key];
    }).filter((obj) =>{
        return obj != null
    });;
    
    return arr;
}

module.exports.invoke = TimePunchService;