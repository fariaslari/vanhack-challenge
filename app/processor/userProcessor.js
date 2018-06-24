const service = require('../service/userService');
const moment = require('moment');

function UserProcessor(params, callback){
    service.invoke(params, (err, data)=>{
        if (err) {
            return callback(err);
        }
        callback(err, Formatter(data));
    });
}

function Formatter(data) {
    if(!data)
        return {}

    // let format =  {
    //     city: data.city,
    //     address: data.address,
    //     overtime: {
    //         daily: {
    //             multiplier: data.labourSettings.dailyOvertimeMultiplier,
    //             threshold: data.labourSettings.dailyOvertimeThreshold
    //         },
    //         weekly: {
    //             multiplier: data.labourSettings.weeklyOvertimeMultiplier,
    //             threshold: data.labourSettings.weeklyOvertimeThreshold
    //         }
    //     }
    // }

    return data;
}

module.exports.invoke = UserProcessor;