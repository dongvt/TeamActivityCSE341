const fs = require('fs');
const path = require('path');

let items = [];

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'items.json'
  );
//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        itemList: items,
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/search',(req, res, next) => {
    const name = req.body.search;

    fs.readFile(p, (err,fileContent) => {
        if (!err) {
            items = JSON.parse(fileContent);
        }
        else {
            console.log(err);
        }
        items = items.filter(item => item.name.includes(name));
        
        res.redirect('/ta03');
    });
    
});

router.post('/readFile',(req, res, next) => {
    
    fs.readFile(p, (err,fileContent) => {
        if (!err) {
            items = JSON.parse(fileContent);
        }
        else {
            console.log(err);
        }
        res.redirect('/ta03');
    });
    
});

module.exports = router;