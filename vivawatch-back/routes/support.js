const express = require('express');
const router = express.Router();
const SupportController = require('../controllers/SupportController');

router.post('/send-support-email', SupportController.sendSupportEmail);

module.exports = router;