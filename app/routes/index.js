module.exports.router = (app) =>{
    app.route('/timePunch').get((req, res)=>{
        let timePunch = require('../controller/timePunchController');
        let validation = timePunch.validation(req);

        if(validation.status)
            timePunch.invoke(req, res);
        else{
            res.status(400).send(validation.message);
        }
    });

    app.route('/location').get((req, res)=>{
        let location = require('../controller/locationController');
        let validation = location.validation(req);

        if(validation.status)
        location.invoke(req, res);
        else{
            res.status(400).send(validation.message);
        }
    });
    
    app.route('/user').get((req, res)=>{
        let user = require('../controller/userController');
        let validation = user.validation(req);

        if(validation.status)
        user.invoke(req, res);
        else{
            res.status(400).send(validation.message);
        }
    });
    
    app.route('/workedTime').get((req, res)=>{
        let workedTime = require('../controller/workedTimeController');
        let validation = workedTime.validation(req);

        if(validation.status)
        workedTime.invoke(req, res);
        else{
            res.status(400).send(validation.message);
        }
    });
}