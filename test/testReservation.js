let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
const app = require('../index');
describe("testing on reservation module", () => {

    describe("GET /reservation", () => {
        it("should get all reservation", (done) => {
            chai.request(app)
                .get(`/reservation/2020-02-22`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });
    });

});
