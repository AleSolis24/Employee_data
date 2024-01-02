USE employees;

INSERT INTO department
    (name)
VALUES 
    ('OPS'),
    ('DEPOT'),
    ('SALES'),
    ('SUPPORT'),
    ('Developers'); 

INSERT INTO role
    (title, salary, department_id)    
VALUES
    ('OPS Lead', 60000, 1),  
    ('OPS Specialist', 45000, 1),
    ('Depot Lead', 35000, 2), 
    ('Depot Specialist', 29000, 2),
    ('AR', 70000, 3),
    ('Controller', 100000, 3),
    ('Support Supervisor', 85000, 4),
    ('Support Specialist', 20000, 4),
    ('Software Engineer', 150000, 5),
    ('Senior Software Engineer', 180000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('David', 'Jones', 2, NULL);  
