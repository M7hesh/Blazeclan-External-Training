var DataTypes = require("sequelize").DataTypes;
var _Users = require("./users");
var _Department = require('./department');
var _Employee = require('./employee');

function initModels(sequelize) {
  var Department = _Department(sequelize, DataTypes);
  var Employee = _Employee(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Employee.belongsTo(Department, {foreignKey:"DeptNo"});
  Department.hasMany(Employee, {foreignKey: "DeptNo"});

  return {
    Department,
    Employee,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
