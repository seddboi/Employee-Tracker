USE employee1_db;

INSERT INTO department (dept_name) 
VALUES ('Corporate'), ('Marketing'), ('Frontline');

INSERT INTO roles (title, salary, department_id)
VAlUES ('Trainer/Operations Director', 75000, 1), ('Marketing Director', 70000, 2), ('Operations Manager', 65000, 3), ('Manager', 60000, 3), ('Shift Lead', 25000, 3), ('Crew Member', 20000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Bill', 'Bobilly', 1, 1), ('Chad', 'Chadson', 2, 1), ('Gary', 'Baker', 3, 2), ('Lisa', 'Lozenge', 4, 3), ('Jerry', 'Richards', 5, 4), ('Katie' , 'Bobatie', 6, 4);

SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name, employee_m.first_name AS mgr_first_name, employee_m.last_name AS mgr_last_name FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department_id Left JOIN employee AS employee_m ON employee.manager_id = employee_m.id;

SELECT* FROM department;

SELECT * FROM roles;

SELECT * FROM employee;
