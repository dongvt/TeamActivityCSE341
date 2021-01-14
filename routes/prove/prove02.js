const express = require('express');
const router = express.Router();

const books = Array();

router.get('/', (req,res,next) => {
    res.render('pages/prove/prove02', { 
        bookList : books,
        path: '/prove/prove02'
    });
});

router.post('/display',(req,res,next) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        sumary: req.body.sumary
    };
    
    books.push(book);
    res.redirect('/prove02');
    
});

module.exports = router;