const admin = require('../config/firebase');

const isAuthenticated = (req, res, next) => {
  try{
    const token = req.headers.authorization.split('Bearer ')[1];;

    if (!token) {
      console.log(token)
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
          uid = decodedToken.uid;
          next();
        })
        .catch((error) => {
          console.error('Error', error);
          res.status(401).json({ error: 'Unauthorized' });
        });
    }} catch (error) {
      res.status(500).json({error: error.message})
    }
} 

module.exports = {
    isAuthenticated,
};