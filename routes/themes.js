const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const themeRequestObj = require('../custom_module');

//theme change from form (method:GET)
router.get('/local', (req, res)=> {
    // path to json themes file
    let filePath = path.join(__dirname, 'themes.json');
        
    //read the themes.json file
    fs.readFile(filePath, (err, content)=>{
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404, {contentType: 'text/html'});
                res.render('404');
                console.log('page not found');

            }else{
                //server error
                res.writeHead(500, {contentType: 'text/html'});
                res.render('500');
                console.log(`Server error: ${ err.code }`);
            }
        }else{
            //data is good. send as response
            let themeObjList = content.themes;
            $.each(themeObjList, (i, theme)=>{
                if (theme.name === req.body.themeChoice){
                    res.render('home', {Ui: `<link rel="stylesheet" href="${ theme.cdn }">`} );
                    console.log(`You selected theme ${theme.name} with a cdn of ${theme.cdn}`);
                }
            });
        }
    })
});

//apply theme  with ajax json file
router.get('/localAjax', (req, res) => {
    //read the json file
    fs.readFile(filePath, (err, content)=>{
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404, {contentType: 'text/html'});
                res.render('404');
                console.log('404');

            }else{
                //server error
                res.writeHead(500, {contentType: 'text/html'});
                res.render('500');
                console.log(`Server error: ${ err.code }`);
            }
        }else{
            //data is good. send as response
            let themeObjList = content.themes;
            $.each(themeObjList, (i, theme)=>{
                themeRequestObj.sleep(i * 2000).then(()=>{
                    res.render('home', {Ui: `<link rel="stylesheet" href="${ theme.cdn }">`});
                    console.log(`Ui is now ${ theme.name } with cdn of ${ theme.cdn }`);
                })                
            });
        }
    });
});

//apply theme from external api (botswatch) with ajax
router.get('/apiAjax', (req, res) => {
    //call the ajax method from imported module object
    themeRequestObj.ajaxTheme(themeRequestObj.extSource);
    $.each(themeRequestObj.servedData, (i, theme)=> {
        themeRequestObj.sleep(i * 2000).then(()=>{
            res.render('home', {Ui: `<link rel="stylesheet" href="${ theme.cssCdn }">`});
            console.log(`Ui is now ${ theme.name } with cdn of ${ theme.cdn }`);
        });
    });
});

//apply theme with fetch json
router.get('/localFetch', (req, res) => {
    //read the json file
    fs.readFile(filePath, (err, content)=>{
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404, {contentType: 'text/html'});
                res.render('404');
                console.log('404');

            }else{
                //server error
                res.writeHead(500, {contentType: 'text/html'});
                res.render('500');
                console.log(`Server error: ${ err.code }`);
            }
        }else{
            //data is good. send as response
            let themeObjList = content.themes;
            $.each(themeObjList, (i, theme)=>{
                themeRequestObj.sleep(i * 2000).then(()=>{
                    res.render('home', {Ui: `<link rel="stylesheet" href="${ theme.cdn }">`});
                    console.log(`Ui is now ${ theme.name } with cdn of ${ theme.cdn }`);
                })                
            });
        }
    });
});

//apply theme from external api (botswatch) with fetch
router.get('/apiFetch', (req, res) => {
    //call the ajax method from imported module object
    themeRequestObj.fetchTheme(themeRequestObj.extSource);
    $.each(themeRequestObj.servedData, (i, theme)=> {
        themeRequestObj.sleep(i * 2000).then(()=>{
            res.render('home', {Ui: `<link rel="stylesheet" href="${ theme.cssCdn }">`} );
            console.log(`Ui is now ${ theme.name } with cdn of ${ theme.cdn }`);
        });
    });
});



module.exports = router;
