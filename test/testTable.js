let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
const app = require('../index');
describe("testing on table module", () => {

    describe("GET /table", () => {
        it("should get all tables", (done) => {
            chai.request(app)
                .get('/table')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });
    });


});
