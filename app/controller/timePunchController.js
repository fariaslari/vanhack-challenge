const processor = require('../processor/timePunchProcessor');

function TimePunch(req, res){
    processor.invoke(req.query, (err, data)=>{
        if (err) {
            return res.status(500).send(err.toString());
        }
        res.send(data);
    });
}

function TimePunch_Validation(req){
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

module.exports.invoke = TimePunch;
module.exports.validation = TimePunch_Validation;