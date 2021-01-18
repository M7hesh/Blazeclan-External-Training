Use Company
 /* Create a new Table*/
Create Table Department (
  DeptNo int Primary Key,
  DeptName varchar(200) not null,
  Location varchar(200) not null
)

/*Add Column*/
Alter table Department Add Column Capacity int not null


Insert into Department Values(10, 'IT', 'Pune',300)
Insert into Department Values(20, 'HRD', 'Pune',30)
Insert into Department Values(30, 'ADMIN', 'Pune',10)
Insert into Department Values(40, 'ACCOUNTS', 'Pune',20)
Insert into Department Values(50, 'SALES', 'Pune',70)

Select * from Department


Create Table Employee (
  EmpNo int Primary Key,
  EmpName varchar(200) Not null,
  Designation varchar(200) Not null,
  Salary int not null,
  DeptNo int not null,
  Constraint FK_DEPTNO
  Foreign Key (DeptNo) References Department (DeptNo)
)

INSERT INTO Employee VALUES
(101, 'Mahesh', 'Manager', 1200000, 10),
(102, 'Vivek', 'Manager', 900000, 20),
(103, 'Mukesh', 'Manager', 800000, 30),
(104, 'Satish', 'Manager', 700000, 40),
(105, 'Vinay', 'Lead', 500000, 10),
(106, 'Tejas', 'Lead', 400000, 20),
(107, 'Tushar', 'Lead', 300000,30),
(108, 'Kaushubh', 'Lead', 400000, 40),
(109, 'Nainish', 'Staff', 120000, 10),
(110, 'AArav', 'Staff', 120000, 20),
(111, 'Krushna', 'Staff', 120000, 30),
(112, 'Sujay', 'Staff', 120000, 40),
(113, 'Amit', 'Assistant', 120000, 10),
(114, 'Abhijit', 'Assistant', 120000, 20),
(115, 'Ajit', 'Assistant', 120000, 30),
(116, 'Krutanjay', 'Assistant', 120000, 40),
(117, 'Nandu', 'Operator', 120000, 10),
(118, 'Anil', 'Operator', 120000, 20),
(119, 'Abhay', 'Operator', 120000, 30),
(120, 'Sanjay', 'Operator', 120000, 40)


select * from Employee 


DELIMITER //
CREATE PROCEDURE getEmployees
(IN desig varchar(200))
BEGIN
  SELECT EmpNo, EmpName, Salary  FROM Employee
  WHERE Designation = desig;
END //
DELIMITER ;

-- CALL getEmployees('Manager');



DELIMITER $$

CREATE PROCEDURE sp_insertdept(IN DeptNo int
, IN DeptName VARCHAR(200)
, IN Location VARCHAR(200)
, IN Capacity int
)
BEGIN

INSERT INTO Department (
DeptNo
, DeptName
, Location
, Capacity
)

    VALUES (DeptNo
, DeptName
, Location
, Capacity);

END$$
# change the delimiter back to semicolon
DELIMITER ;

CALL sp_insertdept(60, 'Training', 'Pune', 230)


Select * from Department

-- Get Employees in specific departments
DELIMITER $$
CREATE PROCEDURE sp_getEmpByDep(IN depNo int)
BEGIN

-- select * from Employee 
SELECT Employee.EmpNo, Employee.EmpName, Employee.Salary,
  Employee.Designation, Department.DeptName  FROM Employee
  -- WHERE Employee.DeptNo = (SELECT DeptNo FROM department 
-- WHERE Employee.DeptNo = depNo);
  JOIN Department on Employee.DeptNO=Department.DeptNo
  WHERE Employee.DeptNo = depNo;

END$$
# change the delimiter back to semicolon
DELIMITER ;

CALL sp_getEmpByDep(20)

-- Calculate Tax
DELIMITER //
CREATE PROCEDURE sp_calTax()
BEGIN

SELECT EmpNo, EmpName, Designation, Salary, DeptNo,
    IF(Salary > 500000, Salary*0.3,
		IF(Salary > 200000, Salary*0.2,
			Salary*0.1)) AS Tax FROM Employee;
            
END //
DELIMITER ;
CALL sp_calTax();