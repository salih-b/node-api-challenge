const express = require('express');
const helmet = require('helmet');

const apiRouter = require('./api-router.js');
const actionApiRouter = require('./action-api-router.js');

const server = express();

server.use(helmet());

server.use('/api', apiRouter);
server.use('/api', actionApiRouter);

module.exports = server;
