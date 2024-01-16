USE employees_DB;

INSERT INTO department (name)
VALUES 
    ('OPS'),
    ('DEPOT'),
    ('SALES'),
    ('SUPPORT'),
    ('Developers'); 


INSERT INTO role (title, salary, department_id)    
VALUES
    ('OPS Lead', 65000, 1),  
    ('OPS Specialist', 55000, 1),
    ('Depot Lead', 35000, 2), 
    ('Depot Specialist', 29000, 2),
    ('AR', 70000, 3),
    ('Controller', 100000, 3),
    ('Support Supervisor', 85000, 4),
    ('Support Specialist', 20000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES


    ('Eric', 'Bull', 1, NULL),
    ('Michelle', 'Lockwood', 2, 1),
    ('David', 'Jones', 3, NULL),
    ('Tito', 'Selva', 4, 3),
    ('Leslie', 'Hallman', 5, NULL),
    ('Reza', 'Riley', 6, 5),
    ('Zaire', 'Jenkins', 7, NULL),
    ('Matt', 'Raft', 8, 7);
