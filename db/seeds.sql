USE employee_db;

INSERT INTO department(name) VALUES ('Frontline'), ('Marketing'), ('Corporate');

INSERT INTO role(title, salary, department_id)
VAlUES ('Crew Member', 20000, 1), ('Shift Lead', 25000, 1), ('Marketing Director', 70000, 2), ('Trainer/Operations Director', 70000, 3), ('Operations Manager', 60000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES ('Bill', 'Bobilly', 1, 1), ('Chad', 'Chadson', 1, 1), ('Gary', 'Baker', 2, 1), ('Lisa', 'Lozenge', 3, NULL), ('Jerry', 'Richards', 4, NULL), ('Katie' , 'Bobatie', 5, NULL);