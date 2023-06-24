const express = require("express");
const {
    addPlace,
    getAllPlace,
    getPlaceByID,
    getPlaceByLocJakpus,
    getPlaceByLocJakut,
    getPlaceByLocJakbar,
    getPlaceByLocJaktim,
    getPlaceByLocJaksel,
    updatePlace,
    deletePlace,
} = require("../controllers/placeControllers");

const router = express.Router();

router.post('/place', addPlace);
router.get('/place', getAllPlace);
router.get('/place/:place_id', getPlaceByID);
router.get('/place/loc/jakpus', getPlaceByLocJakpus);
router.get('/place/loc/jakut', getPlaceByLocJakut);
router.get('/place/loc/jakbar', getPlaceByLocJakbar);
router.get('/place/loc/jaktim', getPlaceByLocJaktim);
router.get('/place/loc/jaksel', getPlaceByLocJaksel);
router.put('/place/:place_id', updatePlace);
router.delete('/place/:place_id', deletePlace);

module.exports = router;