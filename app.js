const inquirer = require('inquirer');
const mysql = require('mysql');
const conTab = require('console.table');
const connectionDB = require('./config/connection.js');

let databaseConnect = mysql.createConnection(connectionDB);

function startApp () {
    console.log('Welcome to the Employee Database!');
    // this reconnects to the DB
    connectToDB();
    // This begins the inquirer prompt
    startMenu();
};

function connectToDB() {
    databaseConnect.connect(function (err) {
        if (err) throw err;
        console.log('Connected to database...');
    });
}

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
        } else if (answer.restart == 'View All Employees by Manager') {
            viewEmployeesBM();
        } else if (answer.restart == 'View All Employees by Department') {
            viewEmployeesBD();
        } else if (answer.restart == 'Add Employee') {
            addEmployee();
        } else if (answer.restart == 'Remove Employee') {
            removeEmployee();
        } else if (answer.restart == 'Update Employee Role') {
            updateEmployee();
        } else if (answer.restart == 'Update Employee Manager') {
            updateEmployeeM();
        } else if (answer.restart == 'Exit') {
            // this disconnects the program from the DB
            databaseConnect.end();
        } 
    });
};


function viewEmployees(employee) {
    let newQuery = "SELECT a.id, a.first_name, a.last_name, role.title, department.name AS department, role.salary, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employee as a LEFT JOIN role on a.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee as b on b.id = a.manager_id;";
    let eArray = [];

    databaseConnect.query(newQuery, (err, res) => {
        if (err) throw err;
        res.forEach((employee) => {
            eArray.push({
                'id': employee.id, 
                'first_name': employee.first_name,
                'last_name': employee.last_name, 
                'title': employee.title,
                'department': employee.department,
                'salary': employee.salary,
                'manager': employee.manager,
            });
        });

        // Console log whole employee list
        console.log('Here are all active Employees:');
        console.table(eArray);
        startMenu();

    });    
};

function viewEmployeesBM() {
    let newQuery = "SELECT CONCAT(b.first_name, ' ', b.last_name) AS manager, a.id, a.first_name, a.last_name, role.title, department.name AS department, role.salary FROM employee as a LEFT JOIN role on a.role_id = role.id LEFT JOIN department on role.department_id = department.id INNER JOIN employee as b on b.id = a.manager_id ORDER BY manager ASC ;";
    let eArray = [];

    databaseConnect.query(newQuery, (err, res) => {
        if (err) throw err;
        res.forEach((employee) => {
            eArray.push({
                'id': employee.id, 
                'first_name': employee.first_name,
                'last_name': employee.last_name, 
                'title': employee.title,
                'department': employee.department,
                'salary': employee.salary,
                'manager': employee.manager,
            });
        });

        // Console table whole employee list by manager
        console.log('Here are all active Employees organized by Manager:');
        console.table(eArray);
        startMenu();

    });
};

function viewEmployeesBD() {
    
};

function addEmployee() {
    
};

function removeEmployee() {
    
};

function updateEmployee() {
    
};

function updateEmployeeM() {
    
};

startApp();