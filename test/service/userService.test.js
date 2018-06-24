var proxyquire = require('proxyquire');
var path = require('path');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe('service/userService.js', function() {
	var apiStub, params, mapStub, getStub;
    
	beforeEach(function () {
        statusSpy = sinon.stub();
        sendSpy = sinon.stub();
        apiStub = sinon.stub();
        getStub = sinon.stub().returns()

		params = {
			
        }

        service = proxyquire(path.join(process.cwd(), 'app/service', 'userService'), {
			'request': {
				get: apiStub
			}
		});

		global.config ={
			api: {
				endpoint: {
					users: ""
				}
			}
		}

    });

    it('Should export the main function', function() {
		expect(service.invoke).to.exist;
	});

	
    it('Should call the API and return an error', function() {
		let json = JSON.stringify({})
		apiStub.yields(new Error(), {}, json);

		service.invoke({}, function(err, result){
			
        });
	});
	
    it('Should call the API and return the data', function() {
		let json = JSON.stringify({ "1" : { "2" : { id: "1"}} ,  "3" : { "4" : {}} })
		apiStub.yields(null, {}, json);
				
		params = {
			userId: 1
		}

		service.invoke(params, function(err, result){
            expect(result).to.be.instanceOf(Object);
        });
	});
});