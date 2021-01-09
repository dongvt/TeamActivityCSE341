const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.render('pages/prove01', { 
        path: '/prove01'
    });
});

router.post('/display',(req,res,next) => {
    let message;
    const myAge = 26;
    //This did not work with the listeners data and on, so I used this to excecute it syncronously
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const age = req.body.age;

    //I'm 26, so I'll compare the age with 26
    if (age < myAge) 
        message = 'You are younger than me!'
    else if (age > myAge)
        message = 'You are older than me!'
    else message = "We have the same age!"

    res.render('pages/prove01dis', {
        firstName: fName,
        lastName: lName,
        message: message,
        path: '/prove01dis'
    });
    
});

module.exports = router;