const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router');

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/api', router);
server.listen(server.get('PORT') || process.env.PORT || 3000, () => console.log('Yo, Server is up!'));
