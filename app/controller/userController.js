const processor = require('../processor/userProcessor');

function User(req, res){
    processor.invoke(req.query, (err, data)=>{
        if (err) {
            return res.status(500).send(err.toString());
        }
        res.send(data);
    });
}

function User_Validation(req){
    let errorMessage = "Please fill the missing fields:";
    let isValid = true;
    let query = req.query;

    return {
        status: isValid,
        message: errorMessage
    };
}

module.exports.invoke = User;
module.exports.validation = User_Validation;