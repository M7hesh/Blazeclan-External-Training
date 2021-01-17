CREATE DATABASE Hospital
-- Make as Default Schema
USE Hospital

CREATE TABLE Doctors(
DoctorRowId INT AUTO_INCREMENT PRIMARY KEY,  
DoctorId VARCHAR(10) Unique Not Null,
DoctorName VARCHAR(200) Not Null,
Degree VARCHAR(100) Not Null,
Specialization VARCHAR(100) Not Null,
ContactNumber INT NOT NULL,
Email VARCHAR(50),
City VARCHAR(20) Not Null
)

INSERT INTO Doctors VALUES
(1,'Doc-1001', 'Dr. Abhay', 'BAMS', 'General Physician', 58881111, 'drabhay@myhospital.com', 'Pune'),
(2,'Doc-1002', 'Dr. Jay', 'BAMS', 'Heart', 58481111, 'drjay@myhospital.com', 'Mumbai'),
(3,'Doc-1003', 'Dr. Govind', 'MD', 'Diabetic', 58881111, 'drgovind@myhospital.com', 'Pune' ),
(4,'Doc-1004', 'Dr. Mahesh', 'MBBS', 'Heart', 218881111, 'drmahesh@myhospital.com', 'Kolhapur' ),
(5,'Doc-1005', 'Dr. Piyush', 'BHMS', 'Cancer', 18881111, 'drpiyush@myhospital.com', 'Mumbai' ),
(6,'Doc-1006', 'Dr. Farhan', 'MD', 'ENT', 68881111, 'drfarhan@myhospital.com', 'Satara' ),
(7,'Doc-1007', 'Dr. Akash', 'MBBS', 'ENT', 78881111, 'drakash@myhospital.com', 'Pune' )

SELECT * FROM Doctors

CREATE TABLE Patients(
PatientRowId INT AUTO_INCREMENT PRIMARY KEY,
PatientId varchar(10),
PatientName VARCHAR(200) Not Null,
Address VARCHAR(300) Not Null,
ContactNo int Not null,
Email VARCHAR(100),
Age int Not Null,
Gender Varchar(10) Not Null,
CONSTRAINT patientId_unique Unique(PatientId)
)

INSERT INTO Patients VALUES
(1,'Pat-1001', 'Mukesh', 'Solapur',  58881111, 'mukesh@abc.com', 34, 'Male'),
(2,'Pat-1002', 'Suresh', 'Kolhapur', 58481111, 'suresh@abc.com', 23, 'Male'),
(3,'Pat-1003', 'Ankita', 'Yewat', 58881111, 'ankita@abc.com', 56, 'Female' ),
(4,'Pat-1004', 'Ganesh', 'Pune', 218881111, 'ganesh@abc.com', 54, 'Male' ),
(5,'Pat-1005', 'Sonam', 'Beed', 18881111, 'sonam@abc.com', 21, 'Female' ),
(6,'Pat-1006', 'Somesh', 'Mumbai', 68881111, 'somesh@abc.com', 74, 'Male' ),
(7,'Pat-1007', 'Preeti', 'Pune', 78881111, 'preeti@abc.com', 62, 'Female' )

SELECT * FROM Patients

CREATE TABLE WardMaster(
WardId INT AUTO_INCREMENT PRIMARY KEY,
WardName VARCHAR(200) NOT NULL
)

INSERT INTO WardMaster VALUES
(101, 'Infants'),
(102, 'Cancer'),
(103, 'Special'),
(104, 'ENT')

select * from WardMaster

CREATE TABLE RoomMaster(
RoomUniqueId int Primary Key,
RoomId varchar (100) Unique not null,
RoomType Varchar(100) not null,
BedsCount int not null,
WardId int not null,
Constraint fk_ward_id FOREIGN KEY (WardId)
REFERENCES WardMaster(WardId)
On DELETE Cascade
)

INSERT INTO RoomMaster VALUES
(10001, 'Gen-0001', 'Single', 1, 101),
(10002, 'Gen-0002', 'Double', 2, 103), 
(10003, 'Inf-0001', 'Single', 1, 102), 
(10004, 'Inf-0002', 'Multi', 4, 102), 
(10005, 'ENT-0001', 'Multi', 5, 104)

select * from RoomMaster

CREATE TABLE DoctorPatientOPD(
RegistrationUniqueId int Auto_INCREMENT PRIMARY KEY not null,
RegistrationId varchar(100) not null,
PatientRowId int not null,
DoctorRowId int not null,
Fees int not null,
Constraint fk_patient_row_is FOREIGN KEY (PatientRowId)
References Patients (PatientRowId),
Constraint fk_doctor_row_id Foreign Key (DoctorRowId)
References Doctors (DoctorRowId)
)
-- DoctorPatientOPD table is child of Doctors, and Patients Tables 
INSERT INTO DoctorPatientOPD VALUES
(1, 'OPD-1', 3, 1, 300),
(2, 'OPD-2', 7, 3, 600),
(3, 'OPD-3', 2, 2, 200),
(4, 'OPD-4', 5, 1, 500),
(5, 'OPD-5', 1, 5, 900)

INSERT INTO DoctorPatientOPD VALUES
(6, 'OPD-6', 4, 4, 300),
(7, 'OPD-7', 1, 4, 600)

select * from DoctorPatientOPD

CREATE TABLE DoctorPatientIPD(
RegistrationUniqueId int Auto_INCREMENT PRIMARY KEY not null,
RegistrationId varchar(100) not null,
PatientRowId int not null,
DoctorRowId int not null,
RoomUniqueId int not null,
Constraint fk_patient_rowroom_is FOREIGN KEY (PatientRowId)
References Patients (PatientRowId),
Constraint fk_doctor_rowroom_id Foreign Key (DoctorRowId)
References Doctors (DoctorRowId),
Constraint fk_room_unique_id Foreign Key (RoomUniqueId)
References RoomMaster (RoomUniqueId)
)
-- DoctorPatientIPD table is child of Doctors, and Patients Tables 

INSERT INTO DoctorPatientIPD VALUES
(1, 'IPD-1', 1, 1, 10001),
(2, 'IPD-2', 5, 4, 10003),
(3, 'IPD-3', 3, 2, 10005),
(4, 'IPD-4', 4, 1, 10002),
(5, 'IPD-5', 2, 4, 10004)

INSERT INTO DoctorPatientIPD VALUES
(6, 'IPD-6', 6, 5, 10002)

select * from DoctorPatientIPD

CREATE TABLE HouseKeepingStaff(
StaffId int Primary key,
StaffName varchar(200) not null,
Address varchar(200) not null,
City varchar(200) not null,
Salary int not null
)

INSERT INTO HouseKeepingStaff VALUES
(101, 'A', 'Ad1', 'Kothroud', 20000),
(102, 'B', 'Ad2', 'Shivajinagar', 12000),
(103, 'C', 'Ad3', 'Bavdhan', 18000),
(104, 'D', 'Ad4', 'Navi Peth', 24000),
(105, 'E', 'Ad5', 'Vanaz', 9000)


-- Find out Patients assigned to each doctor in seperate result from both tables
SELECT PatientName, DoctorName, Patients.PatientRowId, Doctors.DoctorRowId FROM
Doctors, Patients, DoctorPatientIPD
WHERE Doctors.DoctorRowId = DoctorPatientIPD.DoctorRowId
AND Patients.PatientRowId = DoctorPatientIPD.PatientRowId 

SELECT PatientName, DoctorName, Patients.PatientRowId, Doctors.DoctorRowId FROM
Doctors, Patients, DoctorPatientOPD
WHERE Doctors.DoctorRowId = DoctorPatientOPD.DoctorRowId
AND Patients.PatientRowId = DoctorPatientOPD.PatientRowId

-- Patients assigned to aparticular Doctor
SELECT PatientName FROM Patients 
WHERE PatientRowId IN (SELECT PatientRowId FROM DoctorPatientOPD 
WHERE DoctorRowId = 3)


-- Find out how many number of heart patients are in IPD
-- Name of Heart Patients  
SELECT PatientName From Patients
WHERE PatientRowId IN (SELECT PatientRowid FROM DoctorPatientIPD
-- WHERE DoctorRowId = 4)
WHERE DoctorRowId IN (SELECT DoctorRowId FROM Doctors WHERE Specialization = 'Heart'))

-- Number of Heart Patients
SELECT COUNT(*) From Patients
WHERE PatientRowId IN (SELECT PatientRowid FROM DoctorPatientIPD
-- WHERE DoctorRowId = 4)
WHERE DoctorRowId IN (SELECT DoctorRowId FROM Doctors WHERE Specialization = 'Heart'))