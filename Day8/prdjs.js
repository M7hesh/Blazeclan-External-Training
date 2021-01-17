let http = require('http');
let fs = require('fs');
let Products = [{
    productId: 1,
    productName: 'Pen',
}];

//let productPage = fs.readFileSync('prdpage.html');

// let server = http.createServer(function (req, resp) {
//     if (req.method === "GET") {
//         resp.writeHead(200, { 'content-type': 'text/html' });
//         resp.end(productPage);
//     }

//     if (req.method === "POST") {
//         let productData = '';
//         req.on('data', function (prd) {
//             productData += prd;
//         }).on('end', function () {
//             console.log('The received data is ' + productData.toString());
//             resp.end('Data received  from you is ' + productData.toString());
//         });          
//     }
// });

let server = http.createServer(function (req, resp) {
    req.setEncoding('utf-8')
    if (req.method === "GET") {

        if (req.url === '/prdpage') {
            fs.readFile('prdpage.html', (error, file) => {
                if (error) {
                    // file not found or may be error message
                    resp.writeHead(404, { 'Content-Type': 'text/html' });
                    resp.write(error.message);
                    resp.end();
                }
                // respond the HTML file 
                //console.log(`File read = ${file}`);
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                // the HTML contents of teh file will read and written in response
                resp.write(file);
                resp.end();
            });
        }
        else if (req.url === '/respage') {
            fs.readFile('respage.html', (error, file) => {
                if (error) {
                    // file not found or may be error message
                    resp.writeHead(404, { 'Content-Type': 'text/html' });
                    resp.write(error.message);
                    resp.end();
                }
                // respond the HTML file 
                //console.log(`File read = ${file}`);
                //resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                // the HTML contents of teh file will read and written in response
                resp.write(file);
                resp.end();
            });
        }
        else if (req.url === '/respageGET') {
            if(req.method === "GET")
            {
                resp.writeHead(200,{'Content-Type': 'application/json'});
                resp.write(JSON.stringify(Products));
                console.log("In Get");
                resp.end();
            }           
        }
        else {
            resp.writeHead(200, { 'Content-Type': 'text/html' });
            resp.write("Welcome! GO to   /prdpage   or   /respage");
            resp.end();
        }
    }

    if (req.method === "POST") {
        let receivedData;
        req.on('data', (d) => {
            console.log(`Recived data from POST method ${d}`);
            receivedData = JSON.parse(d);
            console.log(d);
            Products.push(receivedData);
            resp.writeHead(200, { 'Content-Type': 'text/html' })
            resp.write(JSON.stringify(Products));
        }).on('end', function () {
            console.log('Received data: ' + Products.toString());
            resp.end('Received data: ' + Products.toString());
        });
    }
});

    // if(req.url === '/about'){
    //     fs.readFile('./views/about.html', (error,file)=>{
    //         if(error){
    //             // file not found or may be error message
    //            resp.writeHead(404, {'Content-Type': 'text/html'});
    //            resp.write(error.message);
    //            resp.end();
    //         } 
    //         // respond the HTML file 
    //         resp.writeHead(200, {'Content-Type': 'text/html'});
    //         // the HTML contents of teh file will read and written in response
    //         resp.write(file); 
    //         resp.end();
    //     });
    // }
//});
server.listen(3001);
console.log('Server started on  3001');