const express = require('express');
const router = express.Router();
const PagesController = require('./controllers/pages_controller');

router.get('/', PagesController.landing);
router.get('/quiz', PagesController.quiz);

module.exports = router;