let express  =require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
 // use the jsonwebtokn package
 let jwt = require('jsonwebtoken');

// imporitng  the user dal
const UserDal  =  require('./dal/userdal');

let instance = express();
instance.use(bodyParser.urlencoded({extended:false})); 
instance.use(bodyParser.json());
instance.use(cors({
    origin: "*", // all origins
    methods: "*", // all http methods
    allowedHeaders: "*" // all headers in HTTP request
}));


// JWT Secret key creation
let jwtSettings = {
    jwtSecret: 'sbisecret007700tercesibs'
};

// set the secret with the express instance
// since the express is actually a host for the REST API (server)
// the secret must be confifuired with the express server 
instance.set("jwtsecret", jwtSettings.jwtSecret);
 


// create an instance of UserDal class
const userObj = new UserDal();
                            //     the request handler callback
instance.post("/api/users/create", userObj.createUser);
instance.post("/api/users/auth", userObj.authUser);
instance.get("/api/depts/all", userObj.getDepts);
 

instance.listen(9092, ()=>{
    console.log('REST API is listening on port 9092');
});