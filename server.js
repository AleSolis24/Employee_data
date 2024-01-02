const connection = require("./DB/connection");
const inquirer = require("inquirer");


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
          {
            name: 'Add User',
            value: 'Add User',
          },
          {
            name: 'View All Users',
            value: 'View All Users',
          },
          {
            name: 'Add User Role',
            value: 'Add User Role',
          },
          {
            name: 'View Roles',
            value: 'View Roles',
          },
          {
            name: 'View Department',
            value: 'View Department',
          },
          {
            name: 'End',
            value: 'END',
          },
        ],
      },
    ]);

    console.log('You selected:', res.choices);

   
    switch (res.choices) {
      case 'Add User':
        await addEmployee();
        break;
      case 'View All Users':
        await viewDepartments();
        break;
      case 'View Roles': 
      await viewRoles();
      break;
      
   

      case 'END':
        console.log('Ending the program.');
        connection.end();
        return;
      default:
        console.log('Invalid choice');
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
      message: 'Enter User Role',
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter User Manager',
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
function viewDepartments(callback) {
  const query = 'SELECT id AS department_id, name AS department_name FROM department';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error viewing departments:', err);
    } else {
      console.table(results);
    }
    if (callback) {
      callback(err, results);
    }
  });
  startJob();
}