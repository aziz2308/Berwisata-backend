const express = require('express');
const {
    getRecommendation, 
    getPlacebyWeather
}= require('../controllers/recommendationControllers');

const router = express.Router();

router.get('/rec', getRecommendation);
router.post('/weather', getPlacebyWeather);

module.exports = router;