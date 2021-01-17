Day 4:

Create a class that performs following operations

Should contain a method to create a Map() of employees
--EmpNo, EmpName, DeptNo, Designation, Salary

Should contain Map() for Deptrtment as follows
--DeptNo, DeptName, Location and Cacapity

The class must have a private method of name Validate(emp) that perorms following
--   Make sure that the EmpNo is Positive and Unique
--  Make sure that the EmpName start from Uppercase
--  Make sure that if the Department has the capacity to accept new employee, if the capacity of the Department is full must throw the Error
--  The Salary should not be -Ve

The class must have following public methods
--  AddEmployee(emp)
--  UpdateEmployee(key, emp)
--  DeleteEmployee(key)
--  GetAllEmployees(condition)
---    Condition could be as follows
----        DeptName - Returns all Employees by DeptName
----        Location - Returns all Employees of a location
----        Designation - Returns all Employees having a specific designation
----        EmpName - Return All Employees having Same EmpName
----        DeptName and Designation - Return all Employees of specifc Department having specific Designation

Write a method to Return All Employees Having Max Salary Per Department