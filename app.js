const { prompt } = require('inquirer');
const db = require('./db/connection');

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do? ',
        choices: [
            'view all departments', 
            'view all roles', 
            'view all employees', 
            'add a department', 
            'add a role', 
            'add an employee', 
            'update an employee role'
        ]
    }
]).then(choice => {
    choice == 'add a role' ? addRole() :
    choice == 'view all roles' ? viewRoles() :
    choice == 'add a department' ? addDepartment() :
    choice == 'view all employees' ? viewEmployees() :
    choice == "view all departments" ? viewDepartments() :
    choice == 'add an employee' ? addEmployee() 
    : updateRole()
});

addRole = () => {
    
}