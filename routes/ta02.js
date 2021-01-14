//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();
const nameList = ['name1','name2','name3'];
let error = '';

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        namesArray: nameList,
        error: error,
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/addUser',(req, res, next) => {
    const index = nameList.indexOf(req.body.name);
    if (index > -1) 
        error = 'Name already exist';
    else {
        nameList.push(req.body.name);
        error = '';
    }
    res.writeHead(302, {'Location': '/ta02'}); 
    return res.end(); 
});

router.post('/removeUser',(req, res, next) => {
    const index = nameList.indexOf(req.body.name);
    if (index != -1) {
        error = '';
        nameList.splice(index,1);
    }
    else 
        error = 'Name not found';

    res.writeHead(302, {'Location': '/ta02'}); 
    return res.end(); 
});

module.exports = router;