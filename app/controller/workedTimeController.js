const async = require('async');
const calculateWork =  require('../lib/calculateWork');
const timePunchProc = require('../processor/timePunchProcessor');
const userProc = require('../processor/userProcessor');
const locationProc = require('../processor/locationProcessor');

function WorkedTime(req, res){

    async.waterfall([
        function(callback) {
            userProc.invoke(req.query, function(err, result){
                callback(err, result[0])
            });
        },
        function(user, callback) {
            locationProc.invoke(user, function(err, result){
                user.location = result;
                callback(err, user)
            });
        },
        function(user, callback) {
            let params = {
                userId: user.id
            };
            timePunchProc.invoke(params, function(err, result){
                user.timePunch = result;
                callback(err, user)
            });
        } 
      ], function(err, data){
        if (err) {
            return res.status(500).send(err.toString());
        }
        data = calculateWork(data);
        res.send(data);
      });
}

function WorkedTime_Validation(req){
    let errorMessage = "Please fill the missing fields:";
    let isValid = true;
    let query = req.query;

    if(!query.userId || query.userId == ""){
        isValid = false;
        errorMessage += "\nuserId";
    }

    return {
        status: isValid,
        message: errorMessage
    };
}

module.exports.invoke = WorkedTime;
module.exports.validation = WorkedTime_Validation;