const service = require('../service/timePunchService');
const moment = require('moment');

function TimePunchProcessor(params, callback){
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

    let format = data.map((tp)=>{
        return {
            date: moment(tp.clockedIn).format('DD-MM-YYYY'),
            clockeIn: tp.clockedIn,
            clockeOut: tp.clockedOut,
            locationID: tp.locationId,
            hourlyWage: tp.hourlyWage
        }
    });
    return format;
}

module.exports.invoke = TimePunchProcessor;