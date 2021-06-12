USE employee1_db;

INSERT INTO department (dept_name) 
VALUES ('Frontline'), ('Marketing'), ('Corporate');

INSERT INTO roles (title, salary, department_id)
VAlUES ('Manager', 60000, 1), ('Crew Member', 20000, 1), ('Shift Lead', 25000, 1), ('Marketing Director', 70000, 2), ('Trainer/Operations Director', 70000, 3), ('Operations Manager', 65000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Bill', 'Bobilly', 1, NULL), ('Chad', 'Chadson', 1, 1), ('Gary', 'Baker', 2, 1), ('Lisa', 'Lozenge', 3, NULL), ('Jerry', 'Richards', 4, NULL), ('Katie' , 'Bobatie', 5, NULL);

SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name, employee_m.first_name AS mgr_first_name, employee_m.last_name AS mgr_last_name FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department_id Left JOIN employee AS employee_m ON employee.manager_id = employee_m.id;

SELECT* FROM department;

SELECT * FROM roles;

SELECT * FROM employee;