const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//rendering the views to display in the DOM
//home page
router.get('/', (req, res)=> res.render('home'));
//about page
router.get('/about', (req, res)=> res.render('about'));
//how it works page
router.get('/howitworks', (req, res)=> res.render('howitworks'));
//contact page
router.get('/contact', (req, res)=> res.render('contact'));

//handle for theme change logic
router.get('/themes', (req, res)=> {
    // path to json themes file
    let filePath = path.join(__dirname, 'static', 'themes.json');
        
    //read the themes.json file
    fs.readFile('../themes.json', (err, content)=>{
        if(err){
            if(err.code === 'ENOENT'){
                res.render('404');
            }else{
                //server error
                res.writeHead(500);
                res.end(`Server error: ${ err.code }`);
            }
        }else{
            //data is good. send as response
            res.writeHead(200, {'contentType': 'application/json'});
            res.end(content, 'utf8');
        }
    });
});




module.exports = router;