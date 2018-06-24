const config = global.config;
const connector = require('request');

function UserService(params, callback){
    connector.get({
        headers: {
            'Content-Type': 'application/json',
        },
        url: config.api.address + config.api.endpoint.users
    },      
    function(err, response, data) {
        if(err){
            callback(err);
        }
        callback(null, filterByParams(params, data));
    });
}

/*Usually the params would be passed to the service/database consult, but how its a static json, this method 
will filter the results */
function filterByParams(params, data){
    let userId = params.userId;
    let allUsers = [];
    let arr = [];
    data = JSON.parse(data);

    //entering into location node and flattening the users
    data =  Object.keys(data).map((location)=>{
        var location = data[location];
        allUsers = allUsers.concat(Object.keys(location).map((key)=>{
            return location[key];
        }));
    });

    if(userId){
        arr = Object.keys(allUsers).map((key)=>{
            if(allUsers[key].id == userId)
                return allUsers[key];
        }).filter((obj) =>{
            return obj != null
        });
    }else{
        arr = allUsers;
    }
    
    return arr;
}

module.exports.invoke = UserService;