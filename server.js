const inquirer = require("inquirer");
const mysql = require("mysql2");



const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Snoopy24",
  database: "employees_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
  startJob();
});

async function startJob() {
  try {
    const res = await inquirer.prompt([
      {
        type: 'list',
        name: 'choices',
        message: 'Please choose your choices',
        choices: [
          'View All Employees',
          'Add Employee',
          'View All Roles',
          'Update Employee Role',
          'Add Role',
          'View All Departments',
          'Add Department',
          'END'
        ],
      },
    ]);

    console.log('You selected:', res.choices);

    switch (res.choices) {
      case 'Add Employee':
        await addEmployee(); // done
        break;
      case 'View All Departments':
        await viewDepartments(); // done 
        break;
      case 'View All Roles':
        await viewRoles(); // done 
        break;
      case 'View All Employees':
        await viewAllEmployees(); // done 
        break;
      case 'Add Department':
        await addADepartment(); // done 
        break;
      case 'Add Role':
        await addARole(); // done 
        break;
      case 'Update Employee Role':
        await updateEmployee();
        break;
      case 'END':
        console.log('Bye-Bye!');
        connection.end();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter User First Name',
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter User Last Name',
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter User Role ID',
      validate: function (input) {
        return !isNaN(input) ? true : 'Please enter a valid number';
      },
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter User Manager ID',
      validate: function (input) {
        return !isNaN(input) ? true : 'Please enter a valid number';
      },
    },
  ]).then((answer) => {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    connection.query(
      query,
      [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
      (err) => {
        if (err) throw err;
        console.log('Employee has been added');
        startJob();
      }
    );
  });
}

function viewDepartments() {
  const query = 'SELECT id AS department_id, name AS department_name FROM department';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error viewing departments:', err);
    } else {
      console.table(results);
    }
    
  });
  startJob(); 
}

function addADepartment() {
  inquirer.prompt([
    {
      name: 'department_name',
      type: 'input',
      message: 'Enter Department Name',
    },
  ]).then((answer) => {
    const query = 'INSERT INTO department (name) VALUES (?)';
    connection.query(
      query,
      [answer.department_name],
      (err) => {
        if (err) {
          console.error('Error adding department:', err);
        } else {
          console.log('Department has been added');
        }
        startJob();
      }
    );
  });
}

function viewAllEmployees() {
  const query = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error viewing employees:', err);
    } else {
      console.table(results);
    }
    startJob(); 
  });
}


function viewRoles() {
  const query = 'SELECT id, title, salary, department_id FROM role';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error viewing roles:', err);
    } else {
      console.table(results);
    }
    startJob(); 
  });
};

function addARole() {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Add A New Role!'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter User Pay',

    },
    {
      name: 'department_id',
      type: 'choices',
      choices: [
        1,
        3,
        6,
        8,
      ],
    }
  ]).then((answer) => {
    const query = 'INSERT INTO role(title, salary, department_id) VALUE (?, ?, ?)';
    connection.query(query, [answer.title, answer.salary, answer.department_id]);
    startJob();
  })
};

function updateEmployee() {
inquirer.prompt([
  {
    name: 'newRole',
    type: 'list',
    choices: [
      "OPS Lead",
      "OPS Specialist",
      "Depot Lead",
      "Depot Specialist",
      "AR",
      "Controller",
      "Support Supervisor",
      "Support Specialist"
    ],
  },
  {
    name: 'newDepartment',
    type: 'list',
    choices: [
      "OPS",
      "DEPOT",
      "SALES",
      "SUPPORT"
    ]
  },
  {
    name: 'newDepartmentId',
    type: 'list',
    choices: [
      1,
      2,
      3,
      4
    ],
  },

])
}


const query = 'UPDATE entries SET employee(title, salary, role_id, department_id) FROM employee';
connection.query(query,[])