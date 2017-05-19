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

