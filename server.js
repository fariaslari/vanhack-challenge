global.config = require('./app/config/').get(process.env.NODE_ENV);

var express = require('express'),
    app = express(),
    port = process.env.PORT || 8081;

require('./app/routes').router(app);

app.use('/', (req, res)=>{
    res.status(200).send();
});

app.listen(port, ()=>{
    console.log('Server started at %i. Environment: %s', port, process.env.NODE_ENV);
});
