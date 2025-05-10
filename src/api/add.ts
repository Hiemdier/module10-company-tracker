import inquirer from 'inquirer';
import { pool } from '../connection.js';
import user_prompt from '../server.js';

const addDepartment = async () => {
    const { department_name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter the name of the department you want to add:',
        },
    ]);

      try {
      await pool.query('INSERT INTO department (department_name) VALUES ($1)', [department_name]);
      console.log(`Added department: ${department_name}`);
    } catch (err) {
      console.error(err);
    } finally {
      user_prompt();
    }
};

const addRole = async () => {
    const { role_name, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'role_name',
            message: 'Enter the name of the role you want to add:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID for this role:',
        },
    ]);

    try {
          await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [role_name, salary, department_id]);
          console.log(`Added role: ${role_name}`);
        } catch (err) {
          console.error(err);
        } finally {
          user_prompt();
        }
};

const addEmployee = async () => {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee you want to add:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee you want to add:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID for this employee:',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for this employee (leave blank if none):',
        },
    ]);

    try {
        const managerIdValue = manager_id ? manager_id : null;
        await pool.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, role_id, managerIdValue]
        );
        console.log(`Added employee: ${first_name} ${last_name}`);
    } catch (err) {
        console.error(err);
    } finally {
        user_prompt();
    }
};

const add = { addDepartment, addRole, addEmployee };

export default add;