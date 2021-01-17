let products = new Map();

let arr = [];
products.set('sudo_key', arr);

document.getElementById('clear').addEventListener('click', function () {  // clears input table
    let inputs = document.getElementsByClassName('c1');
    for (let i in inputs) {
        inputs[i].value = '';
    }
}, false);

document.getElementById('save').addEventListener('click', function () {
    if (!(validate() && idValidation() && priceValidation() && categoryValidation())) { // check if every validation is satisfied
        return;
    }
    let sprd = new Map();

    let pi = document.getElementById("productid").value;
    sprd.set('Id', pi);

    let pn = document.getElementById("productname").value;
    sprd.set('Name', pn);

    let cn = document.getElementById("categoryname").value;
    sprd.set('Category', cn);

    let pr = document.getElementById("price").value;
    sprd.set('Price', pr);

    let mf = document.getElementById("manufacturer").value;
    sprd.set('Manufacturer', mf);

    arr.push(sprd);
    products.set('sudo_key', arr);

    dispTable(sprd, "table2");
}, false);

function dispTable(sprd, tableid) {
    let table = document.getElementById(tableid);
    let row = table.insertRow(-1); // last row

    let c1 = row.insertCell(0);
    let p1 = sprd.get('Id');
    c1.innerHTML = p1;

    let c2 = row.insertCell(1);
    let p2 = sprd.get('Name');
    c2.innerHTML = p2;

    let c3 = row.insertCell(2);
    let p3 = sprd.get('Category');
    c3.innerHTML = p3;

    let c4 = row.insertCell(3);
    let p4 = sprd.get('Price');
    c4.innerHTML = p4;

    let c5 = row.insertCell(4);
    let p5 = sprd.get('Manufacturer');
    c5.innerHTML = p5;
}

function validate() {  // checks if any field is left empty
    let a = document.getElementById("productid").value;
    let b = document.getElementById("productname").value;
    let c = document.getElementById("price").value;
    let d = document.getElementById("manufacturer").value;

    if (!(a && b && c && d)) {
        document.getElementById('dvValidations').innerHTML = '<b> Enter all product details <b>';
        return false;
    }
    else {
        document.getElementById('dvValidations').innerHTML = '';
        return true;
    }
}

function priceValidation() {
    if (document.getElementById("price").value < 0) {
        document.getElementById('dvValidations').innerHTML += '<b> Price cannot be a Negative value! <b>';
        return false;
    }
    else {
        document.getElementById('dvValidations').innerHTML = '';
        return true;
    }
}

function categoryValidation() {   // Category wise price validation 
    var price = document.getElementById("price").value;
    let val = document.getElementById("categoryname").value;
    if ((val == "FOD" && price < 10) || (val == "ECL" && price < 20) || (val == "ECT" && price < 1000)) {
        document.getElementById('dvValidations').innerHTML += `<b> Price is low for the ${val} category! <b>`;
        return false;
    }
    else if (val == "Select") {  // check if category is choosed or not
        document.getElementById('dvValidations').innerHTML += '<b> Please select a Category! <b>';
        document.getElementById("categoryname").value = "Select";
    }
    else {
        document.getElementById('dvValidations').innerHTML = '';
        return true;
    }
}

function idValidation() { // checks for duplicate ids
    if (document.getElementById("productid").value.trim() < 0) { // product id should be positive
        document.getElementById('dvValidations').innerHTML += '<b> Product Ids cannot be negative <b>'; 
        return false;
    }
    let tb = document.getElementById("table2");
    let tbRowLen = tb.rows.length;

    if (tbRowLen == 1) { //Table empty
        return true;
    }

    for (let i = 1; i < tbRowLen; i++) {
        let tbCell = tb.rows.item(i).cells;
        let temp = tbCell.item(0).innerHTML;
        val = document.getElementById("productid").value.trim();
        if (temp == val) {       
            document.getElementById('dvValidations').innerHTML += '<b> Duplicate Product Ids not allowed! <b>';
            return false;
        }
    }
    document.getElementById('dvValidations').innerHTML += '';
    return true;
}

function filterRecords() {
    clr("table3");
    let colNo;
    let valPresent = false;
    let prop = document.getElementById("propertyname").value;
    let findval = document.getElementById("searchtext").value;

    if (prop == "Id") {
        colNo = 0;
    }
    else if (prop == "Name") {
        colNo = 1;
    }
    else if (prop == "Category") {
        colNo = 2;
    }
    else if (prop == "Price") {
        colNo = 3;
    }
    else if (prop == "Manufacturer") {
        colNo = 4;
    }
    let tab = document.getElementById("table2");
    let rowLength = tab.rows.length;

    for (let i = 1; i < rowLength; i++) {
        let recordValues = tab.rows.item(i).cells;
        if (recordValues[colNo].innerHTML == findval) {
            let filterMap = new Map();

            filterMap.set('Id', recordValues[0].innerHTML);
            filterMap.set('Name', recordValues[1].innerHTML);
            filterMap.set('Category', recordValues[2].innerHTML);
            filterMap.set('Price', recordValues[3].innerHTML);
            filterMap.set('Manufacturer', recordValues[4].innerHTML);

            dispTable(filterMap, "table3");
            valPresent = true;
        }
    }
    if (valPresent == false) {
        alert("Re-check details entered. No such items found!");
    }
}

function clr(tid) {
    let tb = document.getElementById(tid);
    while (true) {
        if (tb.rows.length == 1) {
            break;
        }
        tb.deleteRow(-1); // delete last row
    }
}

function filterRec() {
    let tempArr = [];
    let t1 = document.getElementById("table2");
    let rowLen = t1.rows.length;
    if (rowLen == 1) { //no record
        return 0;
    }

    for (let i = 1; i < rowLen; i++) {
        let row = t1.rows.item(i).cells;
        let tempRec = new Map();
        tempRec.set('Id', row[0].innerHTML);
        tempRec.set('Name', row[1].innerHTML);
        tempRec.set('Category', row[2].innerHTML);
        tempRec.set('Price', row[3].innerHTML);
        tempRec.set('Manufacturer', row[4].innerHTML);

        tempArr.push(tempRec);
    }
    return tempArr;
}

function ascSort1(ascFlag) {
    clr("table4");
    let arrTmp = filterRec();
    console.log(arrTmp);
    if (arrTmp == 0) {
        alert("No records :(");
        return;
    }
    let prop1 = document.getElementById("sortpropertyname").value;
    // prop1 is string
    if (prop1 == "Id" || prop1 == "Price") { //Since Id and Price should be sorted by value instead of length
        arrTmp.sort(function (a, b) {
            if (parseInt(a.get(prop1)) < parseInt(b.get(prop1))) {
                if (ascFlag == true) {
                    return -1;
                }
                else {   // reverse sorting
                    return 1;
                }
            }
            else if (parseInt(a.get(prop1)) > parseInt(b.get(prop1))) {
                if (ascFlag == true) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else {
                return 0;
            }
        });
    }
    else { // Sorting of Name, category and manufacturer as string
        arrTmp.sort(function (a, b) {
            if (a.get(prop1) < b.get(prop1)) {
                if (ascFlag == true) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            else if (a.get(prop1) > b.get(prop1)) {
                if (ascFlag == true) {
                    return 1;
                } else {
                    return -1;
                }
            }
            else {
                return 0;
            }
        });
    }

    arrTmp.forEach((v, i) => {
        dispTable(v, "table4");
        //console.log("Added the filtered record " + v);
    });

    console.log(arrTmp);
}

//working
// function ascSort(ascFlag) {
//     clr("table4");
//     let arrTmp = filterRec();
//     console.log(arrTmp);
//     if (arrTmp == 0) {
//         alert("No records :(");
//         return;
//     }
//     let prop1 = document.getElementById("sortpropertyname").value;
//     if (ascFlag == true) {
//         if (prop1 == "Id" || prop1 == "Price") {
//             arrTmp.sort(function (a, b) {
//                 if (parseInt(a.get(prop1)) < parseInt(b.get(prop1))) { return -1; }
//                 else if (parseInt(a.get(prop1)) > parseInt(b.get(prop1))) { return 1; }
//                 else { return 0; }
//             });
//         }
//         else {
//             arrTmp.sort(function (a, b) {
//                 if (a.get(prop1) < b.get(prop1)) { return -1; }
//                 else if (a.get(prop1) > b.get(prop1)) { return 1; }
//                 else { return 0; }
//             });
//         }
//     }
//     else {
//         if (prop1 == "Id" || prop1 == "Price") {
//             arrTmp.sort(function (a, b) {
//                 if (parseInt(a.get(prop1)) < parseInt(b.get(prop1))) { return 1; }
//                 else if (parseInt(a.get(prop1)) > parseInt(b.get(prop1))) { return -1; }
//                 else { return 0; }
//             });
//         }
//         else {
//             arrTmp.sort(function (a, b) {
//                 if (a.get(prop1) < b.get(prop1)) { return 1; }
//                 else if (a.get(prop1) > b.get(prop1)) { return -1; }
//                 else { return 0; }
//             });
//         }
//     }

//     arrTmp.forEach((v, i) => {
//         dispTable(v, "table4");
//         //console.log("Added the filtered record " + v);
//     });

//     console.log(arrTmp);
// }






//  document.getElementById('categoryname').addEventListener('change', function(){
//  var op = document.getElementById('categoryname').value;
// });

// document.getElementById('propertyname').addEventListener('change',function(){
//     var opt = '';
//     for (var i = 0; i < properties.length; a++) {
//     opt += '<option value="' + properties[i] + '">' + properties[i] + '</option>'
//     }
//     document.getElementById('propertycontent').innerHTML = opt;
// });

// if(options)

            // products.set(id:101, name:'Desktop', category:'ECT', price:10000, manufacturer:'HP');
            // products.set(2, {id:102, name:'Laptop', category:'ECT', price:50000, manufacturer:'Dell'});
            // products.set(3, {id:103, name:'Iron', category:'ECL', price:2000, manufacturer:'Havells'});
            // products.set(4, {id:104, name:'Mixer', category:'ECL', price:3000, manufacturer:'Morphy'});
            // products.set(5, {id:105, name:'Biscuts', category:'FOD', price:10, manufacturer:'Britania'});
            // products.set(6, {id:106, name:'Lays', category:'FOD', price:30, manufacturer:'laysabc'}); 
            // products.set(7, {id:107, name:'Rice', category:'FOD', price:80, manufacturer:'riceabc'}); 
            // products.set(8, {id:108, name:'Grains', category:'FOD', price:50, manufacturer:'grainsabc'});

// products.set('id', 101);
// products.set('prName', 'Laptop');
// products.set('category', 'ECT');
// products.set('price', 50000);
// products.set('manufacturer', 'Dell');
