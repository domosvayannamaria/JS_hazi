const getFlowerMW = require('../../../../middleware/inventory/getFlowerMW');
var expect = require('chai').expect; //chai 4.4.1
describe('getFlowerMW middleware', function () {
    /* FOR USING CHAI VERSION 5.1.1
    let expect;
    before(async function () {
        const chai = await import('chai');
        expect = chai.expect;
    });

     */
    it('should call next with no error if flower is not found', function (done) {
        let mw = getFlowerMW({
            FlowerModel: {
                findOne: (p) => {
                    expect(p).to.be.eql({ _id: '0' });
                    return {
                        then: (successCb, errorCb) => {
                            successCb(null);
                        }
                    };
                }
            }
        });

        let resMock = {
            locals: {}
        };

        mw({ params: { flower_id: '0' } }, resMock, (err) => {
            expect(err).to.be.undefined;
            expect(resMock.locals.flower).to.be.undefined;
            done();
        });
    });

    it('should call next with an error if FlowerModel.findOne fails', function (done) {
        let mw = getFlowerMW({
            FlowerModel: {
                findOne: (p) => {
                    expect(p).to.be.eql({ _id: '0' });
                    return Promise.reject(new Error('Database error')); 
                }
            }
        });

        let resMock = {
            locals: {}
        };

        mw({ params: { flower_id: '0' } }, resMock, (err) => {
            expect(err).to.be.an.instanceOf(Error);
            expect(err.message).to.be.eql('Database error');
            done();
        });
    });

    it('should set res.locals.flower to the found flower object', function (done) {
        let mw = getFlowerMW({
            FlowerModel: {
                findOne: (p) => {
                    expect(p).to.be.eql({ _id: '0' });
                    return {
                        then: (successCb, errorCb) => {
                            successCb({ name: 'Rose' });
                        }
                    };
                }
            }
        });

        let resMock = {
            locals: {}
        };

        mw({ params: { flower_id: '0' } }, resMock, (err) => {
            expect(err).to.be.undefined;
            expect(resMock.locals.flower).to.be.eql({ name: 'Rose' });
            done();
        });
    });
});
