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

    describe("/intent/qr", function () {
        describe(">target solving", function() {
            it("the target app is properly resolved");
            it("the options are properly resolved");
            it("the query is properly resolved");
            it("the confidence is properly resolved");
        });
    });
});
