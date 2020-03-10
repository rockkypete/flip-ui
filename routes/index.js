const express = require('express');
const router = express.Router();


//rendering the views to display in the DOM
//home page
let href = 'https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/cyborg/bootstrap.min.css';
router.get('', (req, res)=> {
    res.render('home', {
        title: 'Flip-Ui', 
        Ui: href,
        msg: ''
    });
});


//about page
router.get('/about', (req, res)=> {
    res.render('about', {
        title: 'Flip-Ui | About', 
        Ui: href,
        msg: ''
    });
});


//how it works page
router.get('/howitworks', (req, res)=> {
    res.render('howitworks', {
        title: 'Flip-Ui | How it works', 
        Ui: href,
        msg: ''
    });
});


//contact page
router.get('/contact', (req, res)=> {
    res.render('contact', {
        title: 'Flip-Ui | Contact', 
        Ui: href,
        msg: ''
    });
});

module.exports = router;