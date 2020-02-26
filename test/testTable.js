let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
const app = require('../index');
describe("testing on table module", () => {

    let tableId;

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

    describe("GET /table/available", () => {
        it("should get all available tables", (done) => {
            chai.request(app)
                .get('/table/available')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });
    });

    describe("POST /table", () => {
        it("should add new table", (done) => {
            chai.request(app)
                .post('/table')
                .send({tableNumber: "123212397", numberOfPerson: "3"})
                .end(res => {
                    tableId = res.body._id;
                    res.should.have.status(201);
                    res.body.should.be.a("Object");
                    res.body.message.should.contains("The table is Created successfully");
                    done();
                })
        });

        it("should not add new table because the table is already exists", (done) => {
            chai.request(app)
                .post('/table')
                .send({tableNumber: "5532", numberOfPerson: "3"})
                .end(res => {
                    res.should.have.status(201);
                    res.body.should.be.a("Object");
                    res.body.errors.tableNumber.should.contains("The table is already exists");
                    done();
                })
        });

        it("should not add new table because the data is not valid", (done) => {
            chai.request(app)
                .post('/table')
                .send({tableNumber: "31W", numberOfPerson: "3W"})
                .end(res => {
                    res.should.have.status(405);
                    res.body.errors.numberOfPerson.should.contains("number of person should be number");
                    res.body.errors.tableNumber.should.contains("the number of table should be number");
                    done();
                })
        });
    });

    describe("DELETE /table", () => {
        it("should delete table", (done) => {
            chai.request(app)
                .delete(`/table/${tableId}`)
                .end(res => {
                    res.should.have.status(200);
                    res.body.msg.should.contains("deleted");
                    done();
                })
        });

        it("should not delete table because it is not a valid id", (done) => {
            chai.request(app)
                .delete(`/table/1231321`)
                .end(res => {
                    res.should.have.status(404);
                    res.body.error.should.contains("error in delete data");
                    done();
                })
        });
    })
});
