const { restoreDefaultPrompts } = require("inquirer");

const inquirer = require('inquirer');

function startApp () {
    console.log('Welcome to the Employee Tracking Database.')
    startMenu();
};

function startMenu() {
    inquirer.prompt(
        {
            name: 'restart',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees by Manager', 'View All Employees by Department', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager'] 
        }
    ).then( (answer) => {
        if (answer.restart == 'View All Employees') {
            viewEmployees();
            startMenu();
        } else if (answer.restart == 'View All Employees by Manager') {
            viewEmployeesBM();
            startMenu();
        } else if (answer.restart == 'View All Employees by Department') {
            viewEmployeesBD();
            startMenu();
        } else if (answer.restart == 'Add Employee') {
            addEmployee();
            startMenu();
        } else if (answer.restart == 'Remove Employee') {
            removeEmployee();
            startMenu();
        } else if (answer.restart == 'Update Employee Role') {
            updateEmployee();
            startMenu();
        } else if (answer.restart == 'Update Employee Manager') {
            updateEmployeeM();
            startMenu();
        }
    })
};

function viewEmployees() {
    
}

startApp();