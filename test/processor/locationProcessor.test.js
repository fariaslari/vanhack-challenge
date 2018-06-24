var proxyquire = require('proxyquire');
var path = require('path');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe('processor/locationProcessor.js', function() {
	var serviceStub, data, mapStub, momentStub;
    
	beforeEach(function () {
        statusSpy = sinon.stub();
        sendSpy = sinon.stub();
        serviceStub = sinon.stub();
        momentStub = sinon.stub();

		data = {
			
        }

        processor = proxyquire(path.join(process.cwd(), 'app/processor', 'locationProcessor'), {
            '../service/locationService': {
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
		data = {
			city: "",
			address: "",
			labourSettings: {
				dailyOvertimeMultiplier: "",
				dailyOvertimeThreshold: "",
				weeklyOvertimeMultiplier: "",
				weeklyOvertimeThreshold: ""
			}
		}
		serviceStub.yields(null, data);

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