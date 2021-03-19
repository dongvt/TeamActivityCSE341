const express = require('express');
const router = express.Router();

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../../data/ta10-data.json')

router.get('/', (req, res, next) => {
    res.render('pages/prove/prove11', {
        title: 'Team Activity 11 (Well it is prove)',
        path: '/prove/prove11',
    });
});

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData);
});

router.post('/insert', (req, res, next) => {
    if (!dummyData.avengers.find(item => item.name == req.body.name))
        dummyData.avengers.push({name: req.body.name});

    res.json(dummyData);
});

router.post('/delete', (req, res, next) => {
    const name = req.body.name;

    //Get the index to delete
    const index = dummyData.avengers.findIndex(item => item.name == name);

    //Delete the item from the array
    dummyData.avengers.splice(index,1);
    res.json(dummyData);
});

module.exports = router;