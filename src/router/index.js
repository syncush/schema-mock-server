const { Router } = require('express');
const { getCountMiddleware, mockMiddleware, sendResultToClient } = require('../middleware');

const router = Router();

router.use('/mock', getCountMiddleware);
router.use('/mock/:count', getCountMiddleware);
router.post('/mock', mockMiddleware);
router.use(sendResultToClient);

module.exports = router;
