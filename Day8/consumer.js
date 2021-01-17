let client = require('./extserq');

// 1. define the server infromation for Azure Hosted REST API

let serverOptions = {
    host: 'apiapptrainingnewapp.azurewebsites.net',
    path: '/api/Products',
    method: 'GET' // POST //PUT //DELETE
};
let serverOptionsPost = {
    host: 'apiapptrainingnewapp.azurewebsites.net',
    path: '/api/Products/5',
    method: 'POST', //PUT //DELETE
    headers: {
        'content-Type': 'application.json'
    }
};
// if connecting the External API on localhost 

// let serverOptionsLocal = {
//     host: 'localhost',
//     path:'/api/Products',
//     method: 'GET', // POST //PUT //DELETE
//     port: 9087                                                                                                                                                                                                    
// };
let postPrd = JSON.stringify({ 'ProductId':'Prd9999',
    'ProductName':'Pencil',
    'Manufacturer':'Natraj',
    'CategoryName':'Stationary',
    'Description':'Colour-Pencil',
    'BasePrice':50});
// call the method from module
// initiate ann Async operations
client.getData(serverOptions)
    .then((receivedData) => {
        console.log("GET Data");
        console.log(JSON.stringify(receivedData));
    })
    .catch((error) => {
        console.log(`Error Occured ${error}`);
    });

client.postData(serverOptionsPost,postPrd)
    .then((receivedData) => {
        console.log("POST Data");
        console.log(JSON.stringify(receivedData));
    })
    .catch((error) => {
        console.log(`Error Occured ${error}`);
    });