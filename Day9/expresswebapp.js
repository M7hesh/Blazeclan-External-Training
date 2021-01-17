// 1. load the express object
let express = require('express');
// 1a. loading the path module for reading file paths
// path is standard Node module
let path = require('path');

// 2. define an express instance

let instace = express();

// 3. configure the Static files e.g. JavaScript Path
// configure the other static files in middleware
// express.static() , the method to set path for static resources
// e.g. JavaScript, CSS, images
// the express Web Application Framework will have access to all
// files from the path and map that path to the application path __dirname

instace.use(
    express.static(path.join(__dirname,"./../../node_modules/jquery/dist"))
     //express.static(path.join(__dirname, "C:\Users\Asus\node_modules\jquery\dist"))
 );
 

// 4. configure the router

let router= express.Router();

// 4a. configure the express router in middleware
instace.use(router);


// 5. define routes for Static HTML Pages
// the default
router.get("/", (req,resp)=>{
    // if the incomming URL matches with the route
    // the send the home.html in response
    // set the full path of the html file using 'path' module
    // __dirname, is global Node.js variable that represent the 
    // execution root of the current application
    // path.join(__dirname, './../pages'), join the ./../pages 
    // with the current execution path of the application given vy __dirnaame
    resp.sendFile("index.html", {
        root: path.join(__dirname, './../Day9')
    });
});



router.get("/home", (req,resp)=>{
    // if the incomming URL matches with the route
    // the send the home.html in response
    // set the full path of the html file using 'path' module
    // __dirname, is global Node.js variable that represent the 
    // execution root of the current application
    // path.join(__dirname, './../pages'), join the ./../pages 
    // with the current execution path of the application given vy __dirnaame
    resp.sendFile("home.html", {
        root: path.join(__dirname, './../Day9')
    });
});

router.get("/about", (req,resp)=>{
    // if the incomming URL matches with the route
    // the send the home.html in response
    // set the full path of the html file using 'path' module
    // __dirname, is global Node.js variable that represent the 
    // execution root of the current application
    // path.join(__dirname, './../pages'), join the ./../pages 
    // with the current execution path of the application given vy __dirnaame

// write the logic to query to Map to read the html file path from map based on url received
// extreact the file and passit to the senffile method

    resp.sendFile("about.html", {
        root: path.join(__dirname, './../Day9')
    });
});
// 6. start listening on port to accept requests
instace.listen(9087, ()=>{
    console.log('Express Web App is started on port 9087');
});