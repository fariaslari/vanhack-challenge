var proxyquire = require('proxyquire');
var path = require('path');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe('processor/userProcessor.js', function() {
	var serviceStub, data, mapStub, momentStub;
    
	beforeEach(function () {
        statusSpy = sinon.stub();
        sendSpy = sinon.stub();
        serviceStub = sinon.stub();
		momentStub = sinon.stub().returns({
			format: sinon.stub()
		});
		mapStub = sinon.stub();

		data = {
			map: mapStub
        }

        processor = proxyquire(path.join(process.cwd(), 'app/processor', 'userProcessor'), {
            '../service/userService': {
				invoke: serviceStub
			},
			'moment': momentStub
		});

    });

    it('Should export the main function', function() {
		expect(processor.invoke).to.exist;
	});

	
    it('Should call the service and return an error', function() {
		serviceStub.yields(new Error());

		processor.invoke({}, function(err, result){
            expect(err).to.be.instanceOf(Error);
        });
	});
	
    it('Should call the service and return the data', function() {
		serviceStub.yields(null, data);
		mapStub.yields({ 
			clockedIn: "2017-07-06 22:40:21",
			clockedOut: "2017-07-06 22:40:21",
			locationId: "",
			hourlyWage: ""
        });

		processor.invoke({}, function(err, result){
            expect(result).to.be.instanceOf(Object);
        });
	});
	
	
    it('Should call the service and return no data in an empty object', function() {
		serviceStub.yields(null, null);

		processor.invoke({}, function(err, result){
            expect(result).to.be.instanceOf(Object);
        });
	});
});