const http = require('http');
const path = require('path');
const fs = require('fs');


//create server object
let server = http.createServer((req, res) => {
    //remove whitespace from request with trim
    req.url.trim(); 

    //build file paths
    let currentPage = path.join(__dirname, 'static',
    req.url === '/' ? 'index.html' : req.url);
    

    let themePath = path.join(__dirname, 'static', 'themes.json');
        
    //get extension of file
    let fileExt = path.extname(req.url);
    

    // set the content type for page Header
    let contentType;

    //check file extension and set appropriate content type
    switch (fileExt) {
        
        case '.js':
            contentType = 'text/javascript';
            break;

        case '.css':
            contentType = 'text/css';
            break;

        case '.json':
            contentType = 'application/json';
            break;

        case '.png':
            contentType = 'image/png';
            break;

        case '.jpg':
            contentType = 'image/jpg';
            break;

        default:
            contentType = 'text/html';
            break;
    }
    
        
    if(req.url === '/themes') {
               
        // send the theme json file to the client
        fs.readFile(themePath, (err, content) => {
            if (err) {
                console.log(err);
            }else {
                //success
                res.writeHead(200, { 'content-Type': 'application/json'});
                res.end(content, 'utf8');
            }
        });            
        
    }else{
        // rendering the requested page
        fs.readFile(currentPage, (err, content) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    //page not found load 404 error page
                    fs.readFile(path.join(__dirname, 'public', '404.html'),
                    (err, content) => {
                        res.writeHead(404, { 'content-Type': 'text/html'});
                        res.end(content, 'utf8');
                    })
                }else{
                    //some server error
                    res.writeHead(500);
                    res.end(`Server Error: ${ err.code }`)
                }
            }else {
                //success
                res.writeHead(200, { 'content-Type': contentType});
                res.end(content, 'utf8');
            }
        });
    }
                
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> {
    console.log(`Server running on port ${ PORT }`);
});
