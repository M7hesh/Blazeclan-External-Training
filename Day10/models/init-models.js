var DataTypes = require("sequelize").DataTypes;
var _employee = require("./employee");

function initModels(sequelize) {
  var employee = _employee(sequelize, DataTypes);

  employee.belongsTo(department, { foreignKey: "DeptNo"});
  department.hasMany(employee, { foreignKey: "DeptNo"});

  return {
    employee,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
