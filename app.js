//module imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

//express server instance
const app = express();

//MIDDLEWARES
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'static')));

// handle for rerouting request to express router
app.use('/', require('./routes/index'));
app.use('/about', require('./routes/index'));
app.use('/howitworks', require('./routes/index'));
app.use('/contact', require('./routes/index'));



const PORT = process.env.PORT || 3000;

//server listen for request on port
app.listen(PORT, console.log(`Server is now running on PORT ${ PORT }`));
