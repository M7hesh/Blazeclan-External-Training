var appLogic = function () {
    this.categories = ['ECT', 'ECL', 'FOD'];
    this.products = [
        { ProductId: 101, ProductName: 'Laptop', CategoryName: 'ECT', Price: 100000 },
        { ProductId: 102, ProductName: 'Iron', CategoryName: 'ECL', Price: 2000 },
        { ProductId: 103, ProductName: 'Biscuts', CategoryName: 'FOD', Price: 20 }
    ];
    this.getProducts = function () {
        return this.products;
    };

    this.addProduct = function (prd) {
        var pp = parseInt(prd.Price);
        if(prd.ProductId){  // to check if Id is entered
        if ((pp < 0) || (!pp)) {
            document.getElementById('dvValidations').innerHTML += 'Invalid Price ';
        }
        else{
            document.getElementById('dvValidations').innerHTML = ' ';
            if (((prd.CategoryName == 'ECT') && (pp < 1000)) || ((prd.CategoryName == 'ECL') && (pp < 20)) || ((prd.CategoryName == 'FOD') && (pp < 10))) {
                document.getElementById('dvValidations').innerHTML +=  ` Insufficient amount for ${prd.CategoryName} category`;
            }
            else {
                document.getElementById('dvValidations').innerHTML = '';
                this.products.push(prd);
                return this.products;
            }
        }
    }
    else{
        document.getElementById("productid").style.backgroundColor = 'red';
        document.getElementById('dvValidations').innerHTML = 'ID is Mandatory!';
    }
    };

    this.updateProduct = function (prd) {
        for (var product of this.products) {
            if (product.ProductId == prd.ProductId) {
                product.ProductName = prd.ProductName;
                product.CategoryName = prd.CategoryName;
                product.Price = prd.Price;
            }
        }
        return this.products;
    };
}

// if(document.getElementById('productid').value == this.products.ProductId){
//     document.getElementById('dvValidations').innerHTML += 'ProductId cannot be Duplicated';
// }\

//document.getElementById('dvValidations').innerHTML += "";