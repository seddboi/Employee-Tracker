const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');
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
    let newQuery = "SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name AS department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id";
    // creation of array allows for reorganization of columns to my liking :)

    databaseConnect.query(newQuery, (err, res) => {
        if (err) throw err;
        
        // res.forEach((employee) => {
        //     eArray.push({
        //         'id': employee.id, 
        //         'first_name': employee.first_name,
        //         'last_name': employee.last_name, 
        //         'title': employee.title,
        //         'department': employee.department,
        //         'salary': employee.salary,
        //         'manager': employee.manager,
        //     });
        // });

        // Console table whole employee list
        console.log('Here are all active Employees:');
        console.table(res);

        startMenu();
    });    
};


function viewEmployeesBM() {    
    let mArray = [];

    databaseConnect.query("SELECT DISTINCT b.id, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employee a Inner JOIN employee b ON a.manager_id = b.id",);

    // databaseConnect.query(newQuery, (err, res) => {
    //     if (err) throw err;
    //     res.forEach((employee) => {
    //         eArray.push({
    //             'manager': employee.manager,
    //             'id': employee.id, 
    //             'first_name': employee.first_name,
    //             'last_name': employee.last_name, 
    //             'title': employee.title,
    //             'department': employee.department,
    //             'salary': employee.salary,
    //         });
    //     });

        // Console table whole llst by Manager
    console.log('Here are all active Employees organized by Manager:');
    console.table(eArray);
    startMenu();    
};

function viewEmployeesBD() {
    let newQuery = "SELECT a.id, a.first_name, a.last_name, role.title, department.name AS department, role.salary, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employee as a LEFT JOIN role on a.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee as b on b.id = a.manager_id ORDER BY department ASC;";
    let eArray = [];

    databaseConnect.query(newQuery, (err, res) => {
        if (err) throw err;
        res.forEach((employee) => {
            eArray.push({
                'department': employee.department,
                'id': employee.id, 
                'first_name': employee.first_name,
                'last_name': employee.last_name, 
                'title': employee.title,
                'salary': employee.salary,
                'manager': employee.manager,
            });
        });
        
        // Console table whole employee list by department
        console.log('Here are all active Employees organized by Department:');
        console.table(eArray);
        startMenu();

    });
};

async function addEmployee() {
    
    let newQuery = "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee";

    databaseConnect.query(newQuery, async( err, employees) => {
        newQuery = "SELECT id as value, title as name FROM roles";

        databaseConnect.query(newQuery, async (err, roles) => {
            const newEmployee = await inquirer.prompt(
                {
                    name: "first_name",
                    type: 'input',
                    message: "What is your employee's first name?",
                },
                {
                    name: "last_name",
                    type: 'input',
                    message: "What is your employee's last name?",
                },
                {
                    name: "role_id",
                    type: 'list',
                    message: "What is your employee's RoleID?",
                    choices: roles,
                },
                {
                    name: "manager_id",
                    type: "list",
                    message: "Who is your employee's manager?",
                    choices: employees,
                },
            );

            newQuery = "INSERT INTO employee SET ?"

            databaseConnect.query(newQuery, newEmployee, (err) => {
                if (err) throw err;
                console.log("Employee has been added.");

                startMenu();
            });
        });
    });
};

async function removeEmployee() {
    
};

async function updateEmployee() {
    
};

async function updateEmployeeM() {
    
};

startApp();