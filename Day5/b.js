let prd = {};
//prd object will contain data submitted on the sd.html HTML page

//GET
function getProducts() {

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        // subscribe to the responses for success and failure
        // success
        xhr.onload = function () {
            // check for Http Status as 200
            if (xhr.status == 200) {
                console.log(`In onload ${xhr.response}`);
                // resolve and notify the response to client / subscriber
                resolve(xhr.response);
            } else {
                // reject if there is different status code
                reject('Some Error Occured with the status code');
            }
        };

        // failure
        xhr.onerror = function () {
            // reject if there is different status code
            reject('Some Error Occured with Http Communication');
        };

        // initiate the request
        xhr.open("GET", "https://apiapptrainingnewapp.azurewebsites.net/api/Products");
        // send the request
        xhr.send();

    });
}

// subscribe to the Promise object and either get Resolve or rejected
// getimp() will invoke on clicking GET button
function getimp() {
    getProducts().then((response) => {
        console.log(`Received Response ${response}`);
        document.getElementById("demo").innerHTML = "<h2> Received Response </h2>" + "<br>" + response;
    }).catch((error) => {
        console.log(`Received Error ${error}`);

    });
}
//console.log(getimp());

// POST
function postData(url, data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.onload = function () {
            if (request.status == 201) {
                resolve(request.response);
            } else {
                reject(new Error(request.statusText));
            }
        };

        request.onerror = function () {
            reject(new Error('May be Network Error'));
        };


        request.open("POST", url); // PUT  // DELETE
        // define the request header
        request.setRequestHeader("Content-Type", "application/json");
        // pass the data as JSON string
        request.send(JSON.stringify(data));

    });
}

// postimp() will invoke on clicking POST button
function postimp() {
    postData("https://apiapptrainingnewapp.azurewebsites.net/api/Products", prd)    //prd contains data submitted on the sd.html HTML page
        .then((resp) => {
            console.log(`Data Post successful ${resp}`);
            document.getElementById("demo").innerHTML = "<h2> Data Post successful </h2>" + "<br>" + resp;
        })
        .catch((error) => {
            console.log(`Data Post failed ${error}`);
        });
}


// PUT
function putData(url, data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.onload = function () {
            if (request.status == 200 || 201) {
                resolve(request.response);
            } else {
                reject(new Error(request.statusText));
            }
        };

        request.onerror = function () {
            reject(new Error('May be Network Error'));
        };

        request.open("PUT", url);
        // define the request header
        request.setRequestHeader("Content-Type", "application/json");
        // pass the data as JSON string
        request.send(JSON.stringify(data));
    });
}

// Hard coded data for PUT function
let prdData = {
    ProductRowId: 290,  //enter row id of the record which is to be updated
    ProductId: 'Prd999',
    ProductName: 'Pencil',
    CategoryName: 'Stationary',
    Manufacturer: 'Natraj',
    Description: 'Colour-Pencil',
    BasePrice: 59
};

// putimp() will invoke on clicking PUT button
function putimp() {
    putData("https://apiapptrainingnewapp.azurewebsites.net/api/Products/", prd) //insert row id after link, to use hard coded data use prdData
        .then((resp) => {
            console.log(`Data Put Successful ${resp}`);
            document.getElementById("demo").innerHTML = "<h2> Data Put successfull </h2>" + "<br>" + resp;
        })
        .catch((error) => {
            console.log(`Data Put failed ${error}`);
        });
}

//console.log(putimp());


// DELETE
function deleteData(url, data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.onload = function () {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                console.log(request.status);
                reject(new Error(request.statusText));
            }
        };

        request.onerror = function () {
            reject(new Error('May be Network Error'));
        };


        request.open("DELETE", url);
        // define the request header
        request.setRequestHeader("Content-Type", "application/json");
        // pass the data as JSON string
        request.send(JSON.stringify(data));
    });
}

// deleteimp() will invoke on clicking DELETE button
function deleteimp() {
    deleteData("https://apiapptrainingnewapp.azurewebsites.net/api/Products/290", prd) //insert row id after link
        .then((resp) => {
            console.log(`Data Deleted ${resp}`);
            document.getElementById("demo").innerHTML = "<h2> Data Deleted </h2>" + "<br>" + resp;
        })
        .catch((error) => {
            console.log(`Data Deletion failed ${error}`);
        });
}

// Validation function
const validation = {
    set: function (target, prop, value) {
        if (prop == "ProductId") {
            if (typeof (value) == "string") {
                target[prop] = value;
            }
            else {
                console.log("Product Id should be a string");
                return false;
            }
        }

        if (prop == "ProductName") {
            if (target[prop].length <= 30) {  
                target[prop] = value;
            }
            else {
                console.log("Product Name limit excedded");
                return false;
            }
        }

        if (prop == "BasePrice") {
            if (typeof (value) == "number") {
                target[prop] = value;
            }
            else {
                console.log("Base Price should be a number");
                return false;
            }
        }
        
    }
};

//above validation caused error so created seperate proxies and handlers
const setPrice = {
    set: function (target, prop, value) {
        if (prop == "BasePrice" && typeof (value) == "number") {
            target[prop] = value;
        }
        else {
            return false;
        }
    }
};

const setId = {
    set: function (target, prop, value) {
        if (prop == "ProductId" && typeof (value) == "string") {
            target[prop] = value;
        }
        else {
            return false;
        }
    }
};

const validPxy = new Proxy(prd, validation);
// Note: prd i.e. data from html page
const pxy = new Proxy(prd, {});
const pricepxy = new Proxy(prd, setPrice);
const idpxy = new Proxy(prd, setId);

// submit function will invoke on clicking SUBMIT button
function submit() {
    try {
        // console.log(pxy);
        // console.log(Object.keys(pxy));
        // console.log(Object.values(pxy));

        //pxy.ProductRowId = parseInt(document.getElementById("rId").value);

        idpxy.ProductId = document.getElementById("pId").value;
        pxy.ProductName = document.getElementById("pname").value;
        pxy.CategoryName = document.getElementById("pcat").value;
        pxy.Manufacturer = document.getElementById("pman").value;
        pxy.Description = document.getElementById("pdes").value;
        pricepxy.BasePrice = parseInt(document.getElementById("pbprice").value);

        //  Hard Coded Values
        //idpxy.ProductId = "Prd1000";
        // pxy.ProductName = "Soap";
        // pxy.CategoryName = 'Cosmetic',
        // pxy.Manufacturer = 'Lux',
        // pxy.Description = "Bathing-Soap";
        // pricepxy.BasePrice = 8;

        console.log(Object.values(pxy));
        //console.log(prdData.ProductName.length);
    } catch (e) {
        console.log(e.message);
    }
}