const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.render('pages/prove/prove09', { 
        path: '/prove/prove09'
    });
});

module.exports = router;