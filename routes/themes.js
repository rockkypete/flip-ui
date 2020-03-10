const express = require('express');
const router = express.Router();
const themeRequestObj = require('../config/control');
const defaultThemes = require('../config/defaultUi').Themes;

//theme change from form (method:GET)
router.post('/local', (req, res)=> {
    let { themeChoice } = req.body;
    defaultThemes.forEach((theme, i)=>{
        if (theme.name === themeChoice){
            res.render('home', {
                title: 'Flip-Ui', 
                Ui: `${ theme.cdn }`,
                msg: `Theme ${ theme.name } is now active!`
            });
        }
    })
});



//apply theme from external api (botswatch) with ajax
router.get('/apiAjax', (req, res) => {
    //call the ajax method from imported module object
    themeRequestObj.ajaxTheme(themeRequestObj.extSource);
    $.each(themeRequestObj.servedData, (i, theme)=> {
        themeRequestObj.sleep(i * 2000).then(()=>{
            res.render('home', {
                title: 'Flip-Ui', 
                Ui: `${ theme.cssCdn }`,
                msg: `Theme ${ theme.name } is now active!`
            });
        });
    });
});


//apply theme from external api (botswatch) with fetch
router.get('/apiFetch', (req, res) => {
    //call the ajax method from imported module object
    themeRequestObj.fetchTheme(themeRequestObj.extSource);
    $.each(themeRequestObj.servedData, (i, theme)=> {
        themeRequestObj.sleep(i * 2000).then(()=>{
            res.render('home', {
                title: 'Flip-Ui', 
                Ui: `${ theme.cssCdn }`,
                msg: `Theme ${ theme.name } is now active!`
            });
        });
    });
});



module.exports = router;
