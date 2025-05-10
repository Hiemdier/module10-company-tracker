import express from 'express';
import {connectToDb} from './connection.js';
import inquirer from 'inquirer';
import add from './api/add.js';
import remove from './api/remove.js';
import view from './api/view.js';
import update from './api/update.js';


connectToDb()

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(',------------------------------------------------------,')
console.log('|                                                      |')
console.log('|    _____                 _                           |')
console.log('|   |  ___|_ _ ____  _ __ | | ___  _   _  ___  ___     |')
console.log('|   |  _| | \'_\`  _ \\| \'_ \\| |/ _ \\| | | |/ _ \\/ _ \\    |')
console.log('|   | |___| | | | | | | ) | | (_) | |_| |  __/  __/    |')
console.log('|   |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|    |')
console.log('|                   |_|            |___/               |')
console.log('|                                                      |')
console.log('|    __  __                                            |')
console.log('|   |  \\/  | __ _ _ __   __ _  __ _  ___ _ __          |')
console.log('|   | |\\/| |/ _\` | \'_ \\ / _\` |/ _\` |/ _ \\ \'__|         |')
console.log('|   | |  | | ( | | | | | ( | | (_| |  __/ |            |')
console.log('|   |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|            |')
console.log('|                             |___/                    |')
console.log('|                                                      |')
console.log('\`------------------------------------------------------\'')

const user_prompt = async() => {
  const {action} = await inquirer.prompt ([{
    type: 'list',
    name: 'action',
    message: "Which option would you like?",
    choices: [
      "View all Deparment",
      "Add a Department",
      "Update a Department",
      "Delete a Department",
      "View all Employees",
      "View Employees by Manager",
      "View Employees by Department",
      "Add an Employee",
      "Update Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "Delete an Employee",
      "View all Roles",
      "Add a Role",
      "Update a Role",
      "Delete a Role",
      "View Budget by Department",
      "Exit"      
    ],
  },]);

  switch (action) {
    case "View all Deparment":
      view.viewDepartment();
      break;
    case "Add a Department":
      add.addDepartment();
      break;
    case "Update a Department":
      update.updateDepartment();
      break;
    case "Delete a Department":
      remove.removeDepartment();
      break;
    case "View all Employees":
      view.viewEmployee();
      break;
    case "View Employees by Manager":
      view.viewEmployeeByManager();
      break;
    case "View Employees by Department":
      view.viewEmployeeByDepartment();
      break;
    case "Add an Employee":
      add.addEmployee();
      break;
    case "Update Employee":
      update.updateEmployee();
      break;
    case "Delete an Employee":
      remove.removeEmployee();
      break;
    case "View all Roles":
      view.viewRole();
      break;
    case "Add a Role":
      add.addRole();
      break;
    case "Update a Role":
      update.updateRole();
      break;
    case "Delete a Role":
      remove.removeRole();
      break;
    case "View Budget by Department":      
        view.viewBudget();      
        break;    
    case "Exit":
      console.log("Goodbye!");
      process.exit(0);
  }
};

app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  user_prompt();
});


export default user_prompt;