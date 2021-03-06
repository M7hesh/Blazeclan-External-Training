let express = require('express');

let atob = require('atob');

// adding the body-parser as a middleware in the express
let bodyParser = require('body-parser');

//load cors module
let cors = require('cors');

let instance = express();

// configure the bodyParser to parse utf-8 / utf-16 etc. type of
// posted and map it on the server
// bodyParser.urlencoded({extended:false}) 
// middleware that parse the UrlENcoded bodies that matches with
// the Content-Type
// default is Content-Type:application/json
instance.use(bodyParser.urlencoded({ extended: false }));
// when the HTTP Body contains the data other than 
// JSON forma e.g. x-www-form-urlencoded , form-model 
// data will be carred in Key=value format instaed of JSON
// instance.use(bodyParser.urlencoded({extended:true}));

// read the body from the incommening message from the URL
// anfd parse as JSON
instance.use(bodyParser.json());
// load the JSON parser of bodyparser to read
// the JSON key/value pair and map it will the keys on server

// configure the cors middleware

instance.use(cors({
    origin: "*", // all origins
    methods: "*", // all http methods
    allowedHeaders: "*" // all headers in HTTP request
}));

let CredIds = [{
    username: "abc",
    password: "abc"
},
{
    username: "mahesh",
    password: "mahesh"
}
];

// create a sample database

let employees = [
    { EmpNo: 101, EmpName: 'Mahesh', DeptName: 'IT' },
    { EmpNo: 102, EmpName: 'Vikram', DeptName: 'HRD' },
    { EmpNo: 103, EmpName: 'Suprotim', DeptName: 'SALES' }
];

// create REST APIs

// get request
instance.get("/api/employees", (req, resp) => {
    // set the status and then send the data

    // resp.send(employees); // send buffer, string, json object
    // resp.json(employees); // only for JSON data
    // referred from Express 4.0+

    // 1 read the authorization headers from request
    let authValues = req.headers.authorization;
    // 2.  user sends data as 'Basic UserName:Password'
    // split base on  ' ' blank space between Basic and UserName:Password
    let credValues = authValues.split(' ');
    // credValues[0]--> Basic
    //  credValues[1] --> mahesh:mahesh
    console.log(credValues[0] + '   ' + credValues[1]);
    console.log(credValues[1]);
    let recFound = false;
    //console.log(atob(credValues[1])); 
    // 3. split credValues based on ":"
    // decrypt the encryped header and split it
    // further credValues[1] is split based on ':'
    //let data = atob(credValues[1]).split(':');
    let data = credValues[1].split(':');

    // 4. verify the data as data[0]="mahesh" and data[1] = "mahesh"
    // optionally the credentilas can be verified against users table in database
    for (let i = 0; i < CredIds.length; i++) {
        //if(data[0].trim() === "mahesh" && data[1].trim() === "mahesh"){
        if (data[0].trim() === CredIds[i].username && data[1].trim() === CredIds[i].password) {
            recFound = true;
            break;
        }ds
    if (recFound == true) {
        resp.status(200).send(employees);
    }
    else {
        // 5. if no match then send unAuthorized response
        resp.status(401).send(`Sorry !!! Credentials are not matched`);
    }
});

// get request with URL Parameters 
// http://localhost:9090/api/employees/101
// 101 is the URL parameter
// /api/employees/:id, :id is URL parameters
// return employee that matched with value of :id
// :id is the regular expression to pass  parameters in URL
// these will be passed in HEADERS
// http://server/webapp/api/employees/p1/p2/p3...
// http://server/webapp/api/employees/:p1/:p2/:p3....

instance.get("/api/employees/:id", (req, resp) => {
    // read the URL parameter
    let id = req.params.id;

    // search the record based on id
    let emp = employees.filter((e, idx) => {
        return e.EmpNo == parseInt(id);
    });
    if (emp.length == 0) {
        resp.status(404).send(`Requested EmpNo ${id} is not available`);
    }
    resp.status(200).send(emp[0]);
});

// the post request
instance.post("/api/employees", (req, resp) => {
    // the EXPRESS.JS cannot by default parse the body
    // read the posted data from the client
    let emp = {
        EmpNo: req.body.EmpNo,
        EmpName: req.body.EmpName,
        DeptName: req.body.DeptName
    };
    console.log(JSON.stringify(emp));
    // process the data
    employees.push(emp);
    // send the response (success or fail)
    resp.status(200).send(employees);
});

// the put request

instance.put("/api/employees/:id", (req, resp) => {

    // read the id from header
    let id = parseInt(req.params.id);
    let idd = req.params.id;
    // check if the id matches with EmpNo from request body
    let emp1 = {
        EmpNo: req.body.EmpNo,
        EmpName: req.body.EmpName,
        DeptName: req.body.DeptName
    };
    console.log(id);
    console.log(idd);
    console.log(req.body.EmpNo);
    console.log(emp1.EmpNo);

    if (id !== emp1.EmpNo) {
        resp.status(402).send(`The id = ${id} from URL does not match with data from body EmpNo = ${emp1.EmpNo}`);
    }
    else {
        for (let i = 0; i < employees.length; i++) {
            if (id == employees[i].EmpNo) {
                //employees[i].EmpNo = emp.EmpNo;
                employees[i].EmpName = emp1.EmpName;
                employees[i].DeptName = emp1.DeptName;
                resp.status(200).send(employees);
            }
        }

    }
    // process the data
    // search record from employees array based on id and then Update it
    // send the response (success or fail)
});

// the delete request

instance.delete("/api/employees/:id", (req, resp) => {
    // read the id from header
    let id = parseInt(req.params.id);
    // serach record from employees array
    // if found, then delete
    // else generate error response
    let credIndex = -1;
    for(let i=0; i<employees.length; i++)
    {
        if(employees[i].EmpNo == id)
        {
            console.log(employees[i].EmpNo);
            employees.splice(i,1);
            resp.status(200).send(employees);
            break;
        }
        else{
        resp.status(404).send(`Employee No. ${id} unavailable`);
        }
    }
});




// start listening

instance.listen(9090, () => {
    console.log('REST API is listening on port 9090');
});