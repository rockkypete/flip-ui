const express = require('express');
const router = express.Router();


//rendering the views to display in the DOM
//home page
router.get('/', (req, res)=> {
    res.writeHead(200, {'contentType': 'text/html'});
    res.render('home')
});


//about page
router.get('/about', (req, res)=> {
    res.writeHead(200, {'contentType': 'text/html'});
    res.render('about', {title: '<title>Flip-Ui | About</title>'})
});


//how it works page
router.get('/howitworks', (req, res)=> {
    res.writeHead(200, {'contentType': 'text/html'});
    res.render('howitworks', {title: '<title>Flip-Ui | How it works</title>'})
});


//contact page
router.get('/contact', (req, res)=> {
    res.writeHead(200, {'contentType': 'text/html'});
    res.render('contact', {title: '<title>Flip-Ui | Contact</title>'})
});

module.exports = router;