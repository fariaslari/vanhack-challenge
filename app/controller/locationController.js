const processor = require('../processor/locationProcessor');

function Location_Function(req, res){
    processor.invoke(req.query, (err, data)=>{
        if (err) {
            return res.status(500).send(err.toString());
        }
        res.send(data);
    });
}

function Location_Validation(req){
    let errorMessage = "Please fill the missing fields:";
    let isValid = true;
    let query = req.query;

    if(!query.locationId || query.locationId == ""){
        isValid = false;
        errorMessage += "\nlocationId";
    }

    return {
        status: isValid,
        message: errorMessage
    };
}

module.exports.invoke = Location_Function;
module.exports.validation = Location_Validation;