USE employees_db;

INSERT INTO department (id, name) 
VALUES (1,'Frontline'), (2, 'Marketing'), (3, 'Corporate');

INSERT INTO role (title, salary, department_id)
VAlUES ('Manager', 60000, 1), ('Crew Member', 20000, 1), ('Shift Lead', 25000, 1), ('Marketing Director', 70000, 2), ('Trainer/Operations Director', 70000, 3), ('Operations Manager', 65000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Bill', 'Bobilly', 1, NULL), ('Chad', 'Chadson', 1, 1), ('Gary', 'Baker', 2, 1), ('Lisa', 'Lozenge', 3, NULL), ('Jerry', 'Richards', 4, NULL), ('Katie' , 'Bobatie', 5, NULL);

SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.name, employee_m.first_name as mgr_first_name, employee_m.last_name as mgr_last_name FROM JOIN roles ON employee.role_id = roles.id, JOIN department ON roles.department_id = department_id, Left JOIN employee AS employee_m on employee.manager_id = employee_m.id;

SELECT* FROM department;

SELECT * FROM role;

SELECT * FROM employee;

