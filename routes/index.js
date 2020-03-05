const express = require('express');
const router = require(express.Router());
const fs = require('fs');
const path = require('path');

//rendering the views to display in the DOM
router.get('/', (req, res)=> res.render(home));
router.get('/about', (req, res)=> res.render(about));
router.get('/howitworks', (req, res)=> res.render(howitworks));
router.get('/contact', (req, res)=> res.render(contact));

//handle for theme change logic
router.get('/themes', (req, res)=> {
    // path to json themes file
    let filePath = path.join(__dirname, 'static', 'themes.json');
    
    //read the themes.json file
    fs.readFile(filePath, (err, content)=>{
        if(err){
            throw err;
        }else{
            //data is good. send as response
            res.writeHead(200, {'contentType': 'application/json'});
            res.end(content, 'utf8');
        }
    });
});




module.exports = router;