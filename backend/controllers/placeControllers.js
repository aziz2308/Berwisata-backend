const admin = require("../config/firebase");
const Place = require("../models/placeModel");
const firestore = admin.firestore();

const addPlace = async (req, res) => {
    try {
        const place_id = req.body.place_id;
        const places = firestore.collection('place').doc(place_id);
        const doc = await places.get();
        if(doc.exists) {
            res.status(400).send('Place Data with the same ID has been saved before!')
        } else { 
            const place_data = req.body;
            await places.set(place_data);
            res.send('Place data saved successfully');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllPlace = async (req, res) => {
    try {
        const places = firestore.collection('place');
        const data = await places.get();
        const placesArray = [];
        if(data.empty) {
            res.status(404).send('Place Data not found!');
        } else {
            data.forEach(doc => {
                const places = new Place(
                    doc.data().place_id,
                    doc.data().place_name,
                    doc.data().place_loc,
                    doc.data().place_desc,
                    doc.data().place_imgurl
                );
                placesArray.push(places);
            });
            res.send(placesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlaceByID = async (req, res) => {
    try {
        const place_id = req.params.place_id;
        const place = firestore.collection('place').doc(place_id);
        const data = await place.get();
        if(!data.exists) {
            res.status(404).send('Place data with the given ID was not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlaceByLocJakpus = async (req, res) => {
    try {
        const place = firestore.collection('place').where('place_loc', '==', 'Jakarta Pusat');
        const data = await place.get();
        const placesArray = [];
        if(data.empty) {
            res.status(404).send('Place Data with the given location not found!');
        } else {
            data.forEach(doc => {
                const places = new Place(
                    doc.data().place_id,
                    doc.data().place_name,
                    doc.data().place_loc,
                    doc.data().place_desc,
                    doc.data().place_imgurl
                );
                placesArray.push(places);
            });
            res.send(placesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlaceByLocJakut = async (req, res) => {
    try {
        const place = firestore.collection('place').where('place_loc', '==', 'Jakarta Utara');
        const data = await place.get();
        const placesArray = [];
        if(data.empty) {
            console.log(data)
            res.status(404).send('Place Data with the given location not found!');
        } else {
            data.forEach(doc => {
                const places = new Place(
                    doc.data().place_id,
                    doc.data().place_name,
                    doc.data().place_loc,
                    doc.data().place_desc,
                    doc.data().place_imgurl
                );
                placesArray.push(places);
            });
            res.send(placesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlaceByLocJakbar = async (req, res) => {
    try {
        const place = firestore.collection('place').where('place_loc', '==', 'Jakarta Barat');
        const data = await place.get();
        const placesArray = [];
        if(data.empty) {
            console.log(data)
            res.status(404).send('Place Data with the given location not found!');
        } else {
            data.forEach(doc => {
                const places = new Place(
                    doc.data().place_id,
                    doc.data().place_name,
                    doc.data().place_loc,
                    doc.data().place_desc,
                    doc.data().place_imgurl,
                );
                placesArray.push(places);
            });
            res.send(placesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlaceByLocJaktim = async (req, res) => {
    try {
        const place = firestore.collection('place').where('place_loc', '==', 'Jakarta Timur');
        const data = await place.get();
        const placesArray = [];
        if(data.empty) {
            console.log(data)
            res.status(404).send('Place Data with the given location not found!');
        } else {
            data.forEach(doc => {
                const places = new Place(
                    doc.data().place_id,
                    doc.data().place_name,
                    doc.data().place_loc,
                    doc.data().place_desc,
                    doc.data().place_imgurl,
                );
                placesArray.push(places);
            });
            res.send(placesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlaceByLocJaksel = async (req, res) => {
    try {
        const place = firestore.collection('place').where('place_loc', '==', 'Jakarta Selatan');
        const data = await place.get();
        const placesArray = [];
        if(data.empty) {
            console.log(data)
            res.status(404).send('Place Data with the given location not found!');
        } else {
            data.forEach(doc => {
                const places = new Place(
                    doc.data().place_id,
                    doc.data().place_name,
                    doc.data().place_loc,
                    doc.data().place_desc,
                    doc.data().place_imgurl,
                );
                placesArray.push(places);
            });
            res.send(placesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePlace = async (req, res,) => {
    try {
        const place_id = req.params.place_id;
        const data = req.body;
        const place =  firestore.collection('place').doc(place_id);
        await place.update(data);
        res.send('Place data updated successfully');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePlace = async (req, res,) => {
    try {
        const place_id = req.params.place_id;
        await firestore.collection('place').doc(place_id).delete();
        res.send('Place data deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
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
};