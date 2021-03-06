const express = require('express');
const router = express.Router();
const PagesController = require('./controllers/pages_controller');

router.get('/', PagesController.landing);
router.get('/quiz', PagesController.quiz);
router.post('/quiz', PagesController.checkResponses);
router.get('/leaderboard', PagesController.leaderboard);
router.post('/leaderboard', PagesController.recordScore);

module.exports = router;