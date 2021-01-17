class OrgClass {
    constructor() {

        this.EmpMap = new Map();
        this.DepMap = new Map();

        this.DepMap.set(1, { dNo: 1, dName: 'A', loc: 'Pune', cap: 1000 });
        this.DepMap.set(2, { dNo: 2, dName: 'B', loc: 'Mumbai', cap: 2000 });
        this.DepMap.set(3, { dNo: 3, dName: 'C', loc: 'Banglore', cap: 3000 });

        // this.DepMap.set(1, { dNo: 101, dName: 'A', loc: 'Pune', cap: 1000 });
        // this.DepMap.set(2, { dNo: 102, dName: 'B', loc: 'Pune', cap: 2000 });
        // this.DepMap.set(3, { dNo: 103, dName: 'C', loc: 'Pune', cap: 3000 });
        // this.DepMap.set(4, { dNo: 101, dName: 'A', loc: 'Mumbai', cap: 4000 });
        // this.DepMap.set(5, { dNo: 102, dName: 'B', loc: 'Mumbai', cap: 5000 });
        // this.DepMap.set(6, { dNo: 103, dName: 'C', loc: 'Mumbai', cap: 6000 });
        // this.DepMap.set(7, { dNo: 101, dName: 'A', loc: 'Banglore', cap: 7000 });
        // this.DepMap.set(8, { dNo: 102, dName: 'B', loc: 'Banglore', cap: 8000 });
        // this.DepMap.set(9, { dNo: 103, dName: 'C', loc: 'Banglore', cap: 9000 });

        //this.k;
        //this.eDetails;
    }

    createEmpMap(eNo, eName, eDepNo, eDesg, eSal) {
        //if (this.#validate1(eNo) && this.#validate2(eSal) && this.#validate3(eName)) {
        if (this.#validate(eNo, eSal, eName)) {
             let k = eNo;
             let eDetails = {
                eeNo: eNo, eeName: eName, eeDepNo: eDepNo, eeDesg: eDesg, eeSal: eSal
            };
            this.EmpMap.set(k, eDetails);
            //return this.empMap
        }
    }

    #validate(eNo, eSal, eName) {
        //eName = eName[0].toUpperCase() + eName.slice(1,eName.length);
        if (eNo < 0 || this.EmpMap.has(eNo)){
            console.log(`Emp No.: ${eNo} invalid or used by others`);
            return false;
        }
        if (eSal < 0) {
            console.log(`Salary entered: ${eSal} cannot be negative`);
            return false;
        }
        let rexp = /^[A-Z]/;
        if (!rexp.test(eName)) {
            console.log(`Hey ${eName}, please initiate your name in upper case`);
            return false;
        }
        return true;
    }

    // update working
    updateEmp(eeNo, prop, newval) {
        if (this.EmpMap.has(eeNo)) {
            let tempemp = this.EmpMap.get(eeNo);
            tempemp[prop] = newval;
            this.EmpMap.set(eeNo, tempemp);
            console.log(` ${prop}: ${newval} updated for ID: ${eeNo}`);
        }
        else {
            console.log("Invalid Employee number");
            return;
        }
    }

    getMaxSalary() {
        console.log("Maximum Salary according to Departments are: ");
        this.deptArr.forEach((v, k) => {
            //console.log(v)
            //let dVal = v.get(this.dNo); not working
            //let dVal = v.get(dNo); not working
            let dVal = v.get("dNo"); // not working
            let maxSal = 0;
            let maxSalEmp = [];

            this.EmpMap.forEach((vv, kk) => {
                if (vv.get("eeDepNo") == dVal && parseInt(vv.get("eeSal")) >= maxSal) {
                    maxSal = parseInt(vv.get("eeSal"));
                    maxSalEmp.push(vv);
                }
            });
            console.log(`Max Salary in Department No. ${dVal}:`);
            maxSalEmp.forEach((v1) => {
                console.log(`${v1.get("eeName")}   ${v1.get("eeSal")}`);
            });
        });
    }

    getDeptDesigEmp(tempDepName, tempDesg){
        console.log(`Employees in Department ${tempDepName} working as ${tempDesg}: `);
        let flag = false;
        this.EmpMap.forEach((v, k) => {
            if (v.get("eeDesg") == tempDesg) { //not working
                this.DepMap.forEach((v1, k1) => {
                    if (v1.get("dName") == tempDepName) {
                        console.log(`Number = ${v.get("eeNo")}
                        Name = ${v.get("eeName")}
                        Position = ${v.get("eeDesg")}
                        Salary = ${v.get("eeSal")}`);
                    }
                    flag = true;
                });
            }
        });
        if(flag == false){
            console.log(`No records found`);
        }
    }

    // delete working
    deleteEmp(eeNo) {
        if (this.EmpMap.has(eeNo)) {
            this.EmpMap.delete(eeNo);
            return true;
        }
        else {
            return false;
        }
    }
}

let orgObj = new OrgClass();
//console.log("Department Details  ", orgObj.DepMap);

orgObj.createEmpMap(1, 'Mahesh', 1, 'Intern', 1111); //Adding Employee details
// console.log("Employee Details  ", orgObj.EmpMap);
orgObj.createEmpMap(13, 'Abhimanyu', 2, 'Clan Fellow', -1333); //Negative salary
// console.log("Employee Details  ", orgObj.EmpMap);
orgObj.createEmpMap(16, 'farhan', 1, 'Intern', 1453); //Lower case
// console.log("Employee Details  ", orgObj.EmpMap);
orgObj.createEmpMap(14, 'Kshitij', 3, 'Clan Fellow', 1345);
orgObj.createEmpMap(-8, 'Jay', 1, 'Clan Fellow', 1355); //negative id

orgObj.updateEmp(1, "eeSal", 2522); // updating salary attribute of Mahesh

console.log("Employee Details after updating  ", orgObj.EmpMap); //Display All Employees


//orgObj.getDeptDesigEmp("A", "Intern"); // TypeError: v.get is not a function
//orgObj.getMaxSalary();    // TypeError: v.get is not a function


console.log("Employee Deleted  ", orgObj.deleteEmp(14)); //Delete Id 14

console.log("Employee Details after Deleting ", orgObj.EmpMap); // Display remaining records

