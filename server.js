const inquirer = require("inquirer");
const mysql = require("mysql2");

// this is allowing connection to connect to my SQL DB using DB of "employees_db"
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

// User prompt to select the choices of how they want to work on the DB
async function startJob() {
  try {
    // using inquirer to allow to use the prompt method 
    const res = await inquirer.prompt([
      {
        type: 'list',
        name: 'choices',
        message: 'Please choose your choices',
        choices: [
          'View All Employees',
          'Add Employee',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department',
          'END'
        ],
        loop: false
      },
    ]);

    console.log('You selected:', res.choices);
    // My pompt on how to add certain functionally on adding adding a worker, viewing all dept., viewing all roles, viewing all worker, and updating the user roles 
    switch (res.choices) {
      case 'Add Employee':
        await addEmployee(); // function to add a employee 
        break;
      case 'View All Departments':
        await viewDepartments(); // function to view all dept. 
        break;
      case 'View All Roles':
        await viewRoles(); // function to view all roles  
        break;
      case 'View All Employees':
        await viewAllEmployees(); // function to view all workers 
        break;
      case 'Add Department':
        await addADepartment(); // function to add a dept. 
        break;
      case 'Add Role':
        await addARole(); // function to add a role  
        break;
       // case to end the program 
      case 'END':
        console.log('Bye-Bye!');
        // discount the connection 
        connection.end();
    }

  } catch (error) {
    console.error('Error:', error);
  }
}
// function to add a worker 
function addEmployee() {
  // using inquirer.prompt to allow the user to add the new infromation. 
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
  ])
  // then method to receive the information the user enter to be added in the SQL DB 
  .then((answer) => {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    connection.query(
      query,
      [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
      (err) => {
        if (err) throw err;
        console.log('Employee has been added');
        // calling "startJob" to allow the user to view the prompt questions.
        startJob();
      }
    );
  });
}

// this function is to allow the user to view all department 
function viewDepartments() {
  const query = 'SELECT id AS department_id, name AS department_name FROM department';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('There a ERROR!:', err);
    } else {
      console.table(results);
    }
    
  });
  // this is calling the function to allow the user to view all dept. 
  startJob(); 
}

// function to add a new dept. 
function addADepartment() {
  // using prompt to allow the user to add new dept. by inputting them in. 
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
          console.error('There a ERROR!:', err);
        } else {
          console.log('Department has been added');
        }
        startJob();
      }
    );
  });
}
// function to view all workers
function viewAllEmployees() {
  // using query to select the user first/last name, role, manager into the employee table 
  const query = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('There a ERROR!:', err);
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
      console.error('There a ERROR!:', err);
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



