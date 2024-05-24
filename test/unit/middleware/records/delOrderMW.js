const delOrderMW = require('../../../../middleware/records/delOrderMW');
var expect = require('chai').expect; //chai 4.4.1

describe('delOrderMW middleware', function () {
    /* FOR USING CHAI VERSION 5.1.1
    let expect;
    before(async function () {
        const chai = await import('chai');
        expect = chai.expect;
    });
     */
    it('should delete the order and redirect to /menu/records', function (done) {
        let mockOrderModel = {
            findByIdAndDelete: (id) => {
                return Promise.resolve({ _id: id });
            }
        };

        let mw = delOrderMW({
            OrderModel: mockOrderModel
        });

        let resMock = {
            locals: {
                order: { _id: 'order_id' }
            },
            redirect: function (url) {
                expect(url).to.be.eql('/menu/records');
                done();
            }
        };

        mw({}, resMock, () => {});
    });

    it('should call next with no error if order is not found', function (done) {
        let mockOrderModel = {
            findByIdAndDelete: (id) => {
                return Promise.resolve(null); 
            }
        };

        let mw = delOrderMW({
            OrderModel: mockOrderModel
        });

        let resMock = {
            locals: {
                order: { _id: 'order_id' }
            }
        };

        mw({}, resMock, (err) => {
            expect(err).to.be.undefined;
            done();
        });
    });

    it('should call next with an error if OrderModel.findByIdAndDelete fails', function (done) {
        let mockOrderModel = {
            findByIdAndDelete: () => {
                return Promise.reject(new Error('Database error'));
            }
        };

        let mw = delOrderMW({
            OrderModel: mockOrderModel
        });

        let resMock = {
            locals: {
                order: { _id: 'order_id' }
            }
        };

        mw({}, resMock, (err) => {
            expect(err).to.be.an.instanceOf(Error);
            expect(err.message).to.be.eql('Database error');
            done();
        });
    });

    it('should call next if res.locals.order is undefined', function (done) {
        let mockOrderModel = {
            findByIdAndDelete: () => {
                throw new Error('This should not be called');
            }
        };

        let mw = delOrderMW({
            OrderModel: mockOrderModel
        });

        mw({}, { locals: {} }, (err) => {
            expect(err).to.be.undefined;
            done();
        });
    });
});
