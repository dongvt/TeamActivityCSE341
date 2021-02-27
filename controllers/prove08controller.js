const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
const { json } = require('express');
const https = require('https');

const ITEM_PER_PAGE = 10;
const PAGE_COUNTER = 5;

function paginate(array,page){
    page--;
    let lastIndex = (page * ITEM_PER_PAGE) + ITEM_PER_PAGE;
    return array.slice(page * ITEM_PER_PAGE,lastIndex);
}

exports.getJSONdata = (req,res,next) => {
    const page = +req.query.page || 1;
    https.
    get(url,(response) => {
        let body = '';

        response.on('data',(chunk) => {
            body += chunk;
        });

        response.on('end',() => {
            let firstIndex = 0;
            let endIndex = 0;
            const data = JSON.parse(body);
            if (page - PAGE_COUNTER <= 0){
                firstIndex = 1;
            }
            else {
                firstIndex = page - PAGE_COUNTER;
            }
            
            if (page + PAGE_COUNTER > data.length / ITEM_PER_PAGE) {
                
                endIndex = Math.floor(data.length / ITEM_PER_PAGE);
            }
            else {
                endIndex = page + PAGE_COUNTER;
            }
                
            res.render('pages/ta03', { 
                title: 'Team Activity 03', 
                path: '/ta03', // For pug, EJS 
                itemList: paginate(data,page),
                page: page,
                firstIndex: firstIndex,
                endIndex: endIndex,
                lastPage: Math.floor(data.length / ITEM_PER_PAGE),
                activeTA03: true, // For HBS
                contentCSS: true, // For HBS
            });
        });
    });
    
}