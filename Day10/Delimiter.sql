use Company

select * from Department

-- Stored Proc for reading all records from Employee Table
-- Use 'IN' to define Input Parameter

DELIMITER //
Create Procedure listEmployees
(IN designation varchar(200))
Begin
 Select EmpNo, EmpName, Salary from Employee
 where Designation = designation;
End //  DELIMITER ;

Call listEmployees('Manager')


DELIMITER //
Create Procedure sp_createDepartment(
	IN DeptNo int,
    IN DeptName Varchar(200),
    IN Location Varchar(200),
    IN Capacity int
)
Begin
  Insert into Department (DeptNo, DeptName, Location, Capacity)
  values (DeptNo, DeptName, Location, Capacity); 
 End
//  DELIMITER ;

Call sp_createDepartment(100, 'Civil', 'Pune', 20)

