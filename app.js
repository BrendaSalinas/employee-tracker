const inquirer = require('inquirer');
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
]).then(function(choice){
    switch(choice.options){
        case 'view all departments':
            viewDepartments();
            break;
        case 'view all roles':
            viewRoles();
            break;
        case 'view all employees':
            viewEmployees();
            break;
        case 'add a department':
            addDepartment();
            break;
        case 'add a role':
            addRole();
            break;
        case 'add an employee':
            addEmployee();
            break;
        case 'update an employee role':
            updateRole();
            break;
        default:
            console.log('default');
    }
});

function addRole() {
    inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'What role would you like to add? '
        },
        {
            name: 'salary',
            type: 'number',
            message: 'Please provide a salary: '
        },
        {
            name: 'department_id',
            type: 'number',
            message: 'Please enter department id: '
        }
    ]).then(answer => {
        db.query(
            'INSERT INTO role SET ?',
            {
                title: answer.role,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function (err) {
                if (err)
                    throw err;

                console.log('Employee role updated with' + answer.role);
            }
        );
    });
}