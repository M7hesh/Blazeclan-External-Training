 
// @ts-nocheck
let express  =require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let path = require('path');

// load the seqieluze modules

const {Sequelize, DataTypes, Model}  =  require('sequelize');

let instance = express();
instance.use(bodyParser.urlencoded({extended:false}));
instance.use(bodyParser.json());
instance.use(cors({
    origin: "*", // all origins
    methods: "*", // all http methods
    allowedHeaders: "*" // all headers in HTTP request
}));

// define a database connection information
const sequelize = new Sequelize("Company", "root", "M@heshmlo", {
     host: 'localhost', // database hosting machine-name / ip address / localhost 
     dialect:'mysql', // the database provider engine / service
     pool: { 
        max:5,   // max 5 connection object for the current application
        min: 0,  // default is no connection , it has to be requested
        idle: 10000  // connection idle time in milliseconds for timeout to wait for connection object
     },
     define: { // defining the Model mapping policies(?) to database table
           timestamps:false  // supress the timestamp i.e. used for connecurrency
     }
});

// connct to the Model object that is generated useing sequelize
// use the path module to read Department.js from models folder
// and map the Department exported object to the sequelize object model
// to perform CRUD operations

// require(path.join(__dirname, './../models/Department')) reads the exported module from Department.js
// require(path.join(__dirname, './../models/Department'))(sequelize, Sequelize.DataTypes)
// import the exported function from Department.js and pass 
// sequelize parameter that has the metadata for database connection
// Sequelize.DataTypes, means the DataTypes modules that is used to
// understand DataTypes defined for each property for exported Department module
// Please Note: this is provided in Sequelize version V6 onwards
// in earlier version the code used to be

 // const dept = sequelize.import('./../models/Department.js');

// v6s
// @ts-ignore
const dept = require(path.join(__dirname, './models/Department'))(sequelize, Sequelize.DataTypes);
const emp = require(path.join(__dirname, './models/Employee'))(sequelize, Sequelize.DataTypes);
// dept represent the Dempartment Model that is mapped with the Department table in Company Database
// methods for the 'dept' model mapping
// select * from Department, -- dept.findAll();
// select * from Department where DeptNo =10 -- dept.findOne(where: {DeptNo:10});
// INSERT query --> const newDept = {}; --> dept.create(newDept);
// UPDATE query --> const deptToUpdate={}; -- dept.update(deptToUpdate, {where: {DeptNo:10}})
// DELETE query --> dept.destroy({where:{DeptNo:10}})

// using sequelize for mapping and performing CRUD Operations
// standard programing practices

// sequelize.sync({force:false}).
 //then(()=> {table operations CRUD}). 
 //then((result)=> {}).catch((error)=>{});

// sequelize.sync({force:false}) --> connect to database based on metadta, force:false, do not create table 
// if it is not exist (no-overwrritiong), if force:true, the table will be created if not exist 
// default for force is true
// it returns 'PROMISE'

// then(()=> {table operations CRUD}) -- perform CRUD Operations and returns Promise

// then((result)=> {}), if the operation is successful retrive result in the application

// .catch((error)=>{})m if CRUD failed then capture error messages


// create REST APIs

// get request
instance.get("/api/departments", (req,resp)=>{
    sequelize.sync({
        force:false
    })
        .then(()=>
           dept.findAll() // select all recodrs from Department table
        )
        .then((data)=>{
            resp.json({
                statusCode:200,
                rowsCount: data.length,
                response:data
            });
             
            resp.end();
        })
        .catch((error)=> {
            resp.status(500).send(error.message);
        });
});

instance.get("/api/departments/:id",(req,resp)=>{
    let id = parseInt(req.params.id);
    sequelize.sync({
            force: false // default is true to create a table
        })
        .then(() =>
           dept.findOne(
               {
                   where : {DeptNo:id}
               }
           )
        )
        .then((data) => {
            resp.json({ statusCode: 200, data: data })
            resp.end();
        })
        .catch((error) => resp.send({ statusCode: 500, data: error }));
});

// the post request
instance.post("/api/departments", (req,resp)=> {
    // create a JS object that has same schema like Department model
    let newDept = {
        DeptNo: req.body.DeptNo,
        DeptName: req.body.DeptName,
        Location: req.body.Location,
        Capacity: req.body.Capacity
    };

    // sync with database
    sequelize.sync({force:false})
    .then(()=>
        // create a record and return the commited record from database to API
        {
            return dept.create(newDept);
        } 
      ).then((data)=>{
        resp.json({ statusCode: 200, data: data });
        resp.end();
      }).catch((error) => resp.send({ statusCode: 500, data: error }));
});

// update
instance.put("/api/departments/:id", (req,resp)=> {
    // read the id from the URL parameter
    let id = req.params.id; 
    // sync with database
    sequelize.sync({force:false})
    .then(()=>
        // logic for the update
        dept.update({
            DeptName: req.body.DeptName,
            Location: req.body.Location,
            Capacity: req.body.Capacity
        }, {where:{DeptNo:id}})
      ).then((data)=>{
        resp.json({ statusCode: 200, data: data });
        resp.end();
      }).catch((error) => resp.send({ statusCode: 500, data: error }));
});

// delete
instance.delete("/api/departments/:id",(req,resp)=>{
    let id = parseInt(req.params.id);
    sequelize.sync({
            force: false // default is true to create a table
        })
        .then(() =>
           dept.destroy({where:{DeptNo:id}})
        )
        .then((data) => {
            resp.json({ statusCode: 200, data: data })
            resp.end();
        })
        .catch((error) => resp.send({ statusCode: 500, data: error }));
});

// Perform CRUD operations on Employee

// get request
instance.get("/api/employees", (req,resp)=>{
    sequelize.sync({
        force:false
    })
        .then(()=>
           emp.findAll() // select all recodrs from Department table
        )
        .then((data)=>{
            resp.json({
                statusCode:200,
                rowsCount: data.length,
                response:data
            });
             
            resp.end();
        })
        .catch((error)=> {
            resp.status(500).send(error.message);
        });
});

instance.get("/api/employees/:id",(req,resp)=>{
    let id = parseInt(req.params.id);
    sequelize.sync({
            force: false // default is true to create a table
        })
        .then(() =>
           emp.findOne(
               {
                   where : {EmpNo:id}
               }
           )
        )
        .then((data) => {
            resp.json({ statusCode: 200, data: data })
            resp.end();
        })
        .catch((error) => resp.send({ statusCode: 500, data: error }));
});

// the post request
instance.post("/api/employees", (req,resp)=> {
    // create a JS object that has same schema like Department model
    let newEmp = {
        EmpNo: req.body.EmpNo,
        EmpName: req.body.EmpName,
        Designation: req.body.Designation,
        Salary: req.body.Salary,
        DeptNo: req.body.DeptNo
    };

    // sync with database
    sequelize.sync({force:false})
    .then(()=>
        // create a record and return the commited record from database to API
        {
            return emp.create(newEmp);
        } 
      ).then((data)=>{
        resp.json({ statusCode: 200, data: data });
        resp.end();
      }).catch((error) => resp.send({ statusCode: 500, data: error }));
});

// update
instance.put("/api/employees/:id", (req,resp)=> {
    // read the id from the URL parameter
    let id = req.params.id; 
    // sync with database
    sequelize.sync({force:false})
    .then(()=>
        // logic for the update
        emp.update({
            EmpName: req.body.EmpName,
            Designation: req.body.Designation,
            Salary: req.body.Salary,
            DeptNo: req.body.DeptNo
        }, {where:{EmpNo:id}})
      ).then((data)=>{
        resp.json({ statusCode: 200, data: data });
        resp.end();
      }).catch((error) => resp.send({ statusCode: 500, data: error }));
});

// delete
instance.delete("/api/employees/:id",(req,resp)=>{
    let id = parseInt(req.params.id);
    sequelize.sync({
            force: false // default is true to create a table
        })
        .then(() =>
           emp.destroy({where:{EmpNo:id}})
        )
        .then((data) => {
            resp.json({ statusCode: 200, data: data })
            resp.end();
        })
        .catch((error) => resp.send({ statusCode: 500, data: error }));
});

// start listening
instance.listen(9090, ()=>{
    console.log('REST API is listening on port 9090');
});
