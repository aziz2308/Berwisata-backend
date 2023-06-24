const admin = require('../config/firebase');
const firestore = admin.firestore();
const Place = require('../models/placeModel');
const axios = require('axios');

const getRecommendation = async(req, res) => {
    try {
        const docRef = firestore.collection('place').where('worth', '==', true);
        const data = await docRef.get();
        const recArray = [];
        if(data.empty) {
            res.status(404).send('No data found!')
        } else {
            data.forEach(doc => {
                const recdata = new Place(
                    doc.data().place_id,
                    doc.data().place_name,
                    doc.data().place_loc,
                    doc.data().place_desc,
                    doc.data().place_imgurl
                );
                recArray.push(recdata);
            })
            res.send(recArray);
        }
    } catch(error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
}

const getPlacebyWeather = async(req, res) => {
    try {
        const userCity = req.body.user_city;
        const apiData = await axios.post('https://modelapi-fa4pp7x2cq-uc.a.run.app/weather', { user_city: userCity});
        const { attractions } = apiData.data;
        const docArray = [];

        if(!apiData.empty) {
            const docRef = firestore.collection('place');
            placeData = await docRef.where('place_name', 'in', attractions).get();
            
            if(!placeData.empty) {
                placeData.forEach(doc => {
                    const places = new Place(
                        doc.data().place_id,
                        doc.data().place_name,
                        doc.data().place_loc,
                        doc.data().place_desc,
                        doc.data().place_imgurl
                    );
                    docArray.push(places);
                });
                res.send(docArray);
            } else {
                res.status(400).json({ message: "Place data not found!"});
            };
        } else {
            console.log(apiData);
            res.status(503).json({ message: `Service Unavailable` });
        };
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
}

module.exports = {
    getRecommendation,
    getPlacebyWeather
};