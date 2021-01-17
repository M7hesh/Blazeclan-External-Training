let http = require('http');
//const { parse } = require('path');
let Products = [{
    productId: 1,
    productName: 'Pen',
    category: 'Stationary',
    price: 20
}];
let k = "productId";
let val = 1;

let server = http.createServer((req, resp) => {
    console.log(`Current Method requested: ${req.method}`);
    req.setEncoding('utf-8');

    if (req.method === "POST") {
        let receivedData = [];
        req.on('data', (d) => {
            console.log(`Recived data from POST method ${d}`);
            receivedData = JSON.parse(d);
            val = val + 1;
            receivedData[k] = val;
            //console.log(val);
            //console.log(k);
            console.log(receivedData);
            Products.push(receivedData);
            resp.writeHead(200, { 'Content-Type': 'application/json' });
            resp.write(JSON.stringify(Products));
            resp.end(`Data received: ${JSON.stringify(Products)}`);
        });
    }
    else if (req.method === "GET") {
        let cat = req.url.split('/')[1];
        let catVal = req.url.split('/')[2];

        if (cat !== 'favicon.ico' && cat !== '') {
            console.log(`Searching for ${catVal} in ${cat}`);
            let filterArr = [];

            Products.forEach((v1) => {
                if (v1[cat] == catVal) {
                    console.log(`Record present ${JSON.stringify(v1)})`);
                    filterArr.push(v1);
                }

            });
            if (filterArr.length == 0) {
                resp.writeHead(404, { 'Content-Type': 'application/json' });
                resp.write(JSON.stringify({ "Error": "Record not found" }));
                console.log(`Record not found`);
            }
            else {
                resp.writeHead(200, { 'Content-Type': 'application/json' });
                resp.write(JSON.stringify(filterArr));
            }

            resp.end();
        }
        else {
            resp.writeHead(200, { 'Content-Type': 'application/json' });
            resp.write(JSON.stringify(Products));
            resp.end();
        }
    }

    // let id = req.url.split('/')[1];  // filter Employees based on id
    // console.log(id);
    // if(id !== 'favicon.ico' && id!== ''){
    // let output = Products.filter((e,i)=>{
    //     return e.productId == parseInt(id);
    // });
    // resp.write(JSON.stringify(output));
    // } else {
    // resp.write(JSON.stringify(Products));
    // }
    // resp.end();
});
server.listen(4000);
console.log('Started on Port 4000');