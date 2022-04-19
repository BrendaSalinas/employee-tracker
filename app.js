const inquirer = require('inquirer');
const { prompt } = require('inquirer');
const db = require('./db/connection');

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function callback() {
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
};

// function viewDepartments() {
//     db.query('SELECT * FROM department', function(err, res){
//         if(err) throw err;

//         inquirer.prompt([
//             {
//                 name: 'choice',
//                 type: 'rawlist',
//                 choices: function() {
//                     let choice = [];
//                     for (i =0; i< res.length; i++) {
//                         choice.push(res[i].name);
//                     }
//                     return choice;
//                 },
//                 message: 'Choose department to view'
//             }
//         ]).then(function(theChoice) {
//             db.query('')
//         }
//     })
// }


function addDepartment() {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'Add the name of the department'
        }
    ]).then(ans => {
        db.query(
            'INSERT INTO department VALUES (default, ?)',
            [ans.department],
            function(err){
                if(err) throw err;

                console.log(`Departments have been updated ${ans.department}`)
                callback();
            }
        )
    })
}


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
    ]).then(ans => {
        db.query(
            'INSERT INTO role SET ?',
            {
                title: ans.role,
                salary: ans.salary,
                department_id: ans.department_id
            },
            function (err) {
                if (err) throw err;
                console.log(`Employee role updated with ${ans.role}`);
                callback();
            }
        );
    });
};

function addEmployee() {
    db.query('SELECT * FROM role', (err, res) => {
        if(err) throw err;
        inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Please enter the employee First name: '
            },
            {
                name: 'lastName',
                type:'input',
                message: "Please enter the employee Last name: "
            },
            {
                name: 'role',
                type: 'rawlist',
                choices: function() {
                    var choice = [];
                    for(i=0; i<res.length; i++) {
                        choice.push(res[i].title);
                    }
                    return choice;
                },
                message: 'Select a role'
            }
            
        ]).then(ans => {
            db.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: ans.firstName,
                    last_name: ans.lastName,
                    role_id: ans.role,
                }
            )
            console.log(`We added ${ans.firstName}${ans.lastName}`)
        })
    })
}
callback();