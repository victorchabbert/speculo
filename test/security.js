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

let WRONG_SIGN_USER_JWT = null;
let WRONG_SIGN_DEVICE_JWT = null;
let WRONG_FORMAT_USER_JWT = null;
let WRONG_FORMAT_DEVICE_JWT = null;
let WRONG_ID_USER_JWT = null;
let WRONG_ID_DEVICE_JWT = null;

chai.use(chaiHttp);


describe("#security", function () {

    before(function () {
        //TODO load dyn. ids from bdd
        WRONG_SIGN_USER_JWT = JWT.sign({id: "591d745c1ae0ed04345b5038"}, process.env.JWT_SECRET + "wrong");
        WRONG_SIGN_DEVICE_JWT = JWT.sign({id: "591d745a1ae0ed04345b5037"}, process.env.JWT_SECRET + "wrong");
        WRONG_FORMAT_USER_JWT = JWT.sign("wrong", process.env.JWT_SECRET);
        WRONG_FORMAT_DEVICE_JWT = JWT.sign("wrong", process.env.JWT_SECRET);
        WRONG_ID_USER_JWT = JWT.sign({id: "591d745c1ae0ed04345b5038" + "bad"}, process.env.JWT_SECRET);
        WRONG_ID_DEVICE_JWT = JWT.sign({id: "591d745a1ae0ed04345b5037" + "bad"}, process.env.JWT_SECRET);
    });

    describe("/auth/device", function () {
        it("return a status code 200", function (done) {
            chai.request(SERVER)
                .get('/auth/device')
                .end(function (err, res) {
                    should.not.exist(err);
                    res.should.have.status(200);
                    done();
                });
        });

        it("return a jwt token", function (done) {
            chai.request(SERVER)
                .get('/auth/device')
                .end(function (err, res) {
                    res.text.split(".").length.should.be.eql(3);
                    done();
                });
        });
    });

    describe("/auth/user", function () {
        it("return a status code 200", function (done) {
            chai.request(SERVER)
                .get('/auth/user')
                .end(function (err, res) {
                    should.not.exist(err);
                    res.should.have.status(200);
                    done();
                });
        });

        it("return a jwt token", function (done) {
            chai.request(SERVER)
                .get('/auth/user')
                .end(function (err, res) {
                    res.text.split(".").length.should.be.eql(3);
                    done();
                });
        });
    });

    describe("/intent", function () {
        it("return a status code 401 when no jwt is provided", function (done) {
            chai.request(SERVER)
                .post('/intent')
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                });
        });

        it("return a status code 401 when the jwt signature is wrong", function (done) {
            chai.request(SERVER)
                .post('/intent')
                .set('Authorization', WRONG_SIGN_USER_JWT)
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                });
        });

        /**
         * This case return 500 because it is not supposed to be possible, except if a token from a deleted account is reused
         */
        it("return a status code 401 when the jwt id is wrong but the signature is correct", function (done) {
            chai.request(SERVER)
                .post('/intent')
                .set('Authorization', WRONG_ID_USER_JWT)
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                });
        });

        it("return a status code 401 when the jwt does not verify {id: Number, (opts)}", function (done) {
            chai.request(SERVER)
                .post('/intent')
                .set('Authorization', WRONG_FORMAT_USER_JWT)
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe("ws.connect", function () {
        it("return a status code 401 when no jwt is provided", function (done) {
            var client = new Nes.Client(SOCKET_SERVER);
            client.connect(function (err) {
                err.statusCode.should.eql(401);
                done();
            });
        });

        it("return a status code 401 when the jwt signature is wrong", function (done) {
            var client = new Nes.Client(SOCKET_SERVER);
            client.connect({ auth: { headers: { authorization: WRONG_SIGN_DEVICE_JWT } } }, function (err) {
                err.statusCode.should.eql(401);
                done();
            });
        });

        /**
         * This case return 500 because it is not supposed to be possible, except if a token from a deleted account is reused
         */
        it("return a status code 401 when the jwt id is wrong but the signature is correct", function (done) {
            var client = new Nes.Client(SOCKET_SERVER);
            client.connect({ auth: { headers: { authorization: WRONG_ID_DEVICE_JWT } } }, function (err) {
                err.statusCode.should.eql(401);
                done();
            });
        });

        it("return a status code 401 when the jwt does not verify {id: Number, (opts)}", function (done) {
            var client = new Nes.Client(SOCKET_SERVER);
            client.connect({ auth: { headers: { authorization: WRONG_FORMAT_DEVICE_JWT } } }, function (err) {
                err.statusCode.should.eql(401);
                done();
            });
        });
    });
});
