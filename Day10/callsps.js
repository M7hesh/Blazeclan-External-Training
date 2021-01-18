const {Sequelize, DataTypes, Model}  =  require('sequelize');

const sequelize = new Sequelize("Company", "root", "M@heshmlo", {
    host: 'localhost',  
    dialect:'mysql',  
    pool: { 
       max:5,    
       min: 0,   
       idle: 10000   
    },
    define: {  
          timestamps:false   
    }
});

// calling Stored Procs using 'query()' method of the sequelize

// create a method that calls the  'query()' method of the sequelize
// using ES async and await pattern (recommended in Node.js + Sequelize)

// using 'aysnc' modifier in method menas the method
// is executing some code that return Promise object 

// the 'await' is statement modifer that represents that the statement 
// is returning the promise
// the 'await' will auto-subscribe the thread taht is executing 'Promise' operations

// Note: if a methdo is 'async' then it must have atlease one 'await' call

async function getEmployees() {
    let result = await sequelize.query('CALL listEmployees("Manager")');
    return result;
}

// call the getEmployees()
getEmployees().then((result)=> {
    console.log(`Receive data from SP
      ${JSON.stringify(result)}`);
}).catch((error)=> {
    console.log(`Error Occured ${error.message}`);
});

async function createDepartent(){
    let result = await sequelize.query('CALL sp_createDepartment(101,"Packing","Pune", 70)');
    return result;
}

createDepartent().then((result)=> {
    console.log(`Receive data from SP after create
      ${JSON.stringify(result)}`);
}).catch((error)=> {
    console.log(`Error Occured ${error.message}`);
});

// Create a Get Request that will return All Employees in Specific DeptName with structure of response as
// EmpNo, EmpName, DeptName, Designation, Salary
async function getEmpByDep(){
    let result = await sequelize.query('CALL sp_getEmpByDep(10)');
    return result;
}

getEmpByDep().then((result)=> {
    console.log(`Receive data from SP sp_getEmpByDep()
      ${JSON.stringify(result)}`);
}).catch((error)=> {
    console.log(`Error Occured ${error.message}`);
});


// Create a Get Request that will return Tax for each employee as
// 10% of salary from 1L to 2L
// 20% of salary from 2L to 5L
// 30% more that 5L
async function tax(){
    let result = await sequelize.query('CALL sp_calTax()');
    return result;
}

tax().then((result)=> {
    console.log(`Receive data from SP sp_calTax()
      ${JSON.stringify(result)}`);
}).catch((error)=> {
    console.log(`Error Occured ${error.message}`);
});