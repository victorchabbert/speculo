"use strict";

require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const JWT = require('jsonwebtoken');
const Nes = require('nes');

const SERVER = 'http://localhost:8080';
const SOCKET_SERVER = 'ws://localhost:8080';
const JWT_SECRET = process.env.JWT_SECRET;

let USER_JWT = null;
let DEVICE_JWT = null;
const EXISTING_APP = "weather";

chai.use(chaiHttp);


describe("#intent", function () {

    before(function (done) {
        chai.request(SERVER)
            .get('/auth/device')
            .end(function (err, res) {
                DEVICE_JWT = res.text;

                if(USER_JWT) done();
            });

        chai.request(SERVER)
            .get('/auth/user')
            .end(function (err, res) {
                USER_JWT = res.text;

                if(DEVICE_JWT) done();
            });
    });

    describe("/intent", function () {
        describe(">structure", function() {
            it("return a status code 400 when a bad intent is provided", function (done) {
                chai.request(SERVER)
                    .post('/intent')
                    .set('Authorization', USER_JWT)
                    .send({})
                    .end(function (err, res) {
                        res.should.have.status(400);
                        done();
                    });
            });
        });

        describe(">target solving", function() {
            it("return code 1 when the app target is valid but no device target exist", function (done) {
                chai.request(SERVER)
                    .post('/intent')
                    .set('Authorization', USER_JWT)
                    .send({
                        target: EXISTING_APP,
                        parameters: []
                    })
                    .end(function (err, res) {
                        res.body.code.should.equal(1);
                        res.should.have.status(200);
                        done();
                    });
            });

            it("return code 2 or 3 when a wrong target app name is provided", function (done) {
                chai.request(SERVER)
                    .post('/intent')
                    .set('Authorization', USER_JWT)
                    .send({
                        target: "totally_wrong_target",
                        parameters: []
                    })
                    .end(function (err, res) {
                        res.body.code.should.be.oneOf([2,3]);
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        describe(">permissions", function() {
            it("return code 4 when the app and device target are valid but authorizations are missing");

            it("return code 5 when the requested permission does not exist");

            it("return code 0 when the requested permission is granted");

            it("return code 6 when the revoked permission is not granted");

            it("return code 0 when the revoked permission is deleted");

            it("return code 7 when the permission list is asked");
        });

        describe(">mirrors management", function() {
            it("return code 0 when a mirror is linked");

            it("return code 8 when a non existing mirror is requested to be linked");

            it("return code 0 when the default mirror is changed");

            it("return code 9 when the requested default mirror is not linked to the account");

            it("return code 0 when a mirror is unlinked");

            it("return code 9 when a non linked mirror is requested to be unlinked");
        });

        describe(">misc", function() {
            it("return code 0 when the target app is changed");

            it("return code 6 when the requested default app does not have the required permission");
        })
    });

});
