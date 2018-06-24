var proxyquire = require('proxyquire');
var path = require('path');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe('controller/locationController.js', function() {
    var reqStub, resStub, statusSpy, sendSpy, processorStub;
    
	beforeEach(function () {
        statusSpy = sinon.stub();
        sendSpy = sinon.stub();
        processorStub = sinon.stub();

		reqStub = {
            query:{
                
			}
		}

        resStub={
			status: statusSpy.returns({
                send: sendSpy
            }), 
			send: sendSpy
        }
        controller = proxyquire(path.join(process.cwd(), 'app/controller', 'locationController'), {
            '../processor/locationProcessor': {
				invoke: processorStub
            }
		});

    });

    it('Should export the main function and the validation function', function() {
		expect(controller.invoke).to.exist;
		expect(controller.validation).to.exist;
	});
		
	it('Should go throght the validation and return true', function () {
		reqStub = {
			query: {
				locationId: 123
			}
		};

		controller.validation(reqStub);
    });
	
	it('Should go throght the validation and return false', function () {
		reqStub.query={};

		controller.validation(reqStub);
    });
	
	it('Should call the processor and return an error', function () {
		processorStub.yields(new Error());

		controller.invoke(reqStub, resStub);

		expect(statusSpy.calledWith(500)).to.equal(true);
	});
	
	it('Should call the processor and return an error', function () {
		processorStub.yields(null, {});

		controller.invoke(reqStub, resStub);

        expect(sendSpy).to.have.been.called;
	});
	

});