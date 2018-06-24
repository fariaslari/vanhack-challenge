exports.get = function get(env) {
    switch (env) {
        case 'dev':
            return require('../config/development');
            break;
        case 'prod':
        default:
            return require('../config/production.js');
            break;
    }
}