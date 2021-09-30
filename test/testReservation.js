let mongoose = require('mongoose');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
const app = require('../index');
describe("testing on reservation module", async() => {

    await describe("GET /reservation", () => {
        xit("should get all reservation", (done) => {
            chai.request(app)
                .get(`/reservation/2020-03-27`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });
    });

    await describe("POST /reservation", () => {
        let tableId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

        xit("should not add new reservation", (done) => {
            chai.request(app)
                .post('/reservation')
                .send({ tableId, reserveDate: "2020-02-22", from: "2", to: "3" })
                .end(({ body }) => {
                    body.should.be.a("Object");
                    body.error.should.contains("sorry, you can not reserve table for a reserveDate before today");
                    done();
                })
        });
        xit("should not add new reservation", (done) => {
            chai.request(app)
                .post('/reservation')
                .send({ tableId, reserveDate: "2020-02-222", from: "2", to: "3" })
                .end(({ body }) => {
                    body.should.be.a("Object");
                    body.errors
                        .reserveDate
                        .should
                        .contains("date should be in yyyy-mm-dd format and not less than 2020 or bigger than 2099");
                    done();
                })
        });
        xit("should not add new reservation", (done) => {
            chai.request(app)
                .post('/reservation')
                .send({ tableId, reserveDate: "2020-02-22", from: "2d", to: "3d" })
                .end(({ body }) => {
                    const { from, to } = body.errors;
                    body.errors.should.be.a("Object");
                    from.should.contains("time should be between 1 and 24");
                    to.should.contains("time should be between 1 and 24");
                    done();
                })
        });
        xit("should not add new reservation", (done) => {
            chai.request(app)
                .post('/reservation')
                .send({ tableId, reserveDate: "2020-02-22", from: "22", to: "3" })
                .end(({ body }) => {
                    const { to } = body.errors;
                    body.errors.should.be.a("Object");
                    to.should.contains("the end of your reserve should be after the start");
                    done();
                })
        });
        xit("should not add new reservation", (done) => {
            chai.request(app)
                .post('/reservation')
                .send({ tableId, reserveDate: "2021-05-22", from: "2", to: "3" })
                .end(({ body }) => {
                    body.should.be.a("Object");
                    body.table.should.contains("this table dose not exist");
                    done();
                })
        });

    });
});