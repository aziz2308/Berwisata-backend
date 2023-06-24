const express = require('express');
const {
    createItinerary,
    getAllItineraryByUser,
    getSpecificItineraryByUser,
    addPlaceToItinerary
} = require('../controllers/itineraryControllers');
const {
    isAuthenticated
 } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/planner',  isAuthenticated,createItinerary);
router.get('/planner/all',  isAuthenticated,getAllItineraryByUser);
router.get('/planner/specific',  isAuthenticated,getSpecificItineraryByUser);
router.post('/planner/add',  isAuthenticated,addPlaceToItinerary);

module.exports = router;