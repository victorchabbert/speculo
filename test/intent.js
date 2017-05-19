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

        it("return error code 1 when no ", function (done) {
            chai.request(SERVER)
                .post('/intent')
                .set('Authorization', USER_JWT)
                .send({
                    target: "totally_wrong_target",
                    parameters: []
                })
                .end(function (err, res) {
                    res.text.should.eql("{code: 1, message: \"no target device available\"}");
                    res.should.have.status(200);
                    done();
                });
        });

        it("return a status code 200 when an unknown target is provided", function (done) {
            chai.request(SERVER)
                .post('/intent')
                .set('Authorization', USER_JWT)
                .send({
                    target: "totally_wrong_target",
                    parameters: []
                })
                .end(function (err, res) {
                    res.text.should.eql("TODO");
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
