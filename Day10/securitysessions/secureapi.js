let express  =require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let session = require('express-session');

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

// confiure the session middleware to Express Instance
instance.use(session({
    secret: 'xYz12321ZyX', // sign for secret for ID
    resave:false, // data will be save in store with new entry for eah request
    saveUninitialized:true, // force the login session
    cookie:{maxAge:3600000} // expiry for 1 HR
}));



// create an instance of UserDal class
const userObj = new UserDal();
                            //     the request handler callback
instance.post("/api/users/create", userObj.createUser);
instance.post("/api/users/auth", userObj.authUser);
instance.get("/api/depts/all", userObj.getDepts);
instance.post("/api/logout", userObj.logout);

instance.listen(9091, ()=>{
    console.log('REST API is listening on port 9091');
});