USE employees_db;

INSERT INTO department (id, name) VALUES (1,'Frontline'), (2, 'Marketing'), (3, 'Corporate');

INSERT INTO role(id, title, salary, department_id)
VAlUES (1, 'Manager', 60000, 1), (2, 'Crew Member', 20000, 1), (3, 'Shift Lead', 25000, 1), (4, 'Marketing Director', 70000, 2), (5, 'Trainer/Operations Director', 70000, 3), (6, 'Operations Manager', 65000, 1);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id) 
VALUES (3, 'Bill', 'Bobilly', 1, NULL), (5, 'Chad', 'Chadson', 1, 1), (1, 'Gary', 'Baker', 2, 1), (4, 'Lisa', 'Lozenge', 3, NULL), (2, 'Jerry', 'Richards', 4, NULL), (6, 'Katie' , 'Bobatie', 5, NULL);