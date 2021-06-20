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

// this function is meant to print out all available employees in the db
function viewEmployees(employee) {
    let newQuery = "SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name AS department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id";

    databaseConnect.query(newQuery, (err, res) => {
        if (err) throw err;
        
        // old method of gathering employees... too much work imo
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

        console.log('Here are all active Employees:');
        console.table(res);

        startMenu();
    });    
};


function viewEmployeesBM() {    
    let newQuery = "SELECT * FROM employee";

    databaseConnect.query(newQuery, async (err, res) => {
        
        // let loadEmployees = res.map( (x) => x.manager_id);
        
        const selectedMgr = await inquirer.prompt(
            [
                {
                    name: 'selectedMgr',
                    type: 'list',
                    message: 'Select a possible manager:',
                    choices: () => {
                        return res.map((x) => x.manager_id + ' ' + x.first_name + ' ' + x.last_name);
                    },
                }
            ]
        );

        let selectedMgrID = selectedMgr['selectedMgr'].charAt(0);

        console.log(selectedMgrID);
        let newerQuery = `SELECT first_name, last_name FROM employee WHERE manager_id=${selectedMgrID}`;
        databaseConnect.query(newerQuery, (err, res) => {
            if (err) throw err;

            console.log('Results:');
            console.table(res);

            startMenu();
        });
    });    
};

// non-functional 
function viewEmployeesBD() {
    let newQuery = "SELECT * FROM department";

    databaseConnect.query(newQuery, async (err, res) => {
        const selectedDept = await inquirer.prompt(
            [
                {
                    name: 'selectedDept',
                    type: 'list',
                    message: 'Select a department:',
                    choices: () => {
                        return res.map((x) => x.dept_name);
                    },
                }
            ]
        );
        console.log(selectedDept);

        let newerQuery = 'SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name AS department FROM employee LEFT JOIN role ON employee.role_id = roles.id LEFT JOIN department ON role.department_id = department.id';
        databaseConnect.query(newerQuery, (err, res) => {
            if (err) throw err;

            console.log('Results:');
            console.table(res.filter( (x) => selectedDept === x.department)); 

            startMenu();
        });
    });
};

async function addEmployee() {
    
    let newQuery = "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee";
    databaseConnect.query(newQuery, async( err, res) => {
        let employeeList = res.map( (x) => x.value + ' ' + x.name);
        // console.log(employeeList);
        newQuery = "SELECT id as value, title as name FROM roles";
        databaseConnect.query(newQuery, async (err, res) => {
            let roleList = res.map( (x) => x.value + ' ' + x.name);
            // console.log(roleList);
            const newEmployee = await inquirer.prompt([
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
                    choices: roleList,
                },
                {
                    name: "manager_id",
                    type: "list",
                    message: "Who is your employee's manager?",
                    choices: employeeList,
                },
            ]
            );
            newEmployee.role_id = newEmployee.role_id.charAt(0);
            newEmployee.manager_id = newEmployee.manager_id.charAt(0);
            // console.log(newEmployee);

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