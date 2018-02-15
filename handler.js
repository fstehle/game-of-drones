'use strict';

const uuid = require('uuid');
const fetch = require('node-fetch');

const REGISTER_URL = 'https://dronebiz.azurewebsites.net/api/RegisterFlight';
const DRONE_DATA_URL = 'https://game-of-drones.azurewebsites.net/api/drone-data';

/* eslint-disable no-param-reassign */

module.exports.request = function (context, req) {
    context.log('request endpoint called');

    const requestId = uuid.v4();
    const flightTime = 1;

    const from = req.query.from;
    const to = req.query.to;

    const url = `${REGISTER_URL}?id=${requestId}&url=${DRONE_DATA_URL}&flightTime=${flightTime}`;
    context.log(`Calling URL:${url}`);
    fetch(url)
        .then(response => response.json())
        .then(json => {
            context.res = {
                status: 200,
                body: {
                    register_body: json,
                    request_id: requestId,
                },
            };

            context.done();
        })
        .catch(error => {
            context.log(error);

            context.res = {
                status: 500,
                body: 'kapott',
            };

            context.done();
        });
};

module.exports.droneData = function (context, req) {
    context.log('droneData endpoint called');

    const id = req.query.id;
    const remainingFlightTime = req.query.remainingFlightTime;

    context.log(`Got id: ${id}, remainingFlightTime: ${remainingFlightTime}`);

    context.res = {
        status: 200,
        body: 'OK',
    };

    context.done();
};

module.exports.status = function (context) {
    context.log('status endpoint called');

    context.res = {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 200,
        body: [{"2/14/2018 2:36:57 PM +00:00": {"type": "requested"}}],
    };

    context.done();
};
