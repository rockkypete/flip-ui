//module imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');


//express server instance
const app = express();

//MIDDLEWARES
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));


// handle for rerouting request to express router
app.use('/', require('./routes/index'));

//themes endpoint
app.use('/themes', require('./routes/themes'));



const PORT = process.env.PORT || 3000;

//server listen for request on port
app.listen(PORT, console.log(`Server is now running on PORT ${ PORT }`));
