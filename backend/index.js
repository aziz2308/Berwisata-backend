const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PlaceRoutes = require("./routes/placeRoutes");
const ItineraryRoutes = require('./routes/itineraryRoutes');
const RecommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', PlaceRoutes);
app.use('/api', ItineraryRoutes);
app.use('/api', RecommendationRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server listening on " + PORT)
})