import inquirer from "inquirer";
import {pool} from "../connection.js";
import user_prompt from "../server.js";

const removeDepartment = async () => {
    const { department_id } = await inquirer.prompt([
        {
            type: "input",
            name: "department_id",
            message: "Enter the ID of the department you want to remove:",
        },
    ]);

    try {
        // Check if the role is still associated with a department
        const roleCheckQuery = `
            SELECT department_id 
            FROM role
            WHERE department_id = $1 
        `;
        const roleCheckResult = await pool.query(roleCheckQuery, [department_id]);

        if (roleCheckResult.rows.length > 0) {
            const roleTitleQuery = `
            SELECT title 
            FROM role
            WHERE department_id = $1
            `;
            const roleTitleResult = await pool.query(roleTitleQuery, [department_id]);
            console.log(`Cannot remove department. It is still associated with the role: "${roleTitleResult.rows[0].title}".`);
            return user_prompt();
        }
        // If no associations found, proceed to delete the department
        const query = "DELETE FROM department WHERE id = $1";
        await pool.query(query, [department_id]);
        console.log(`Department with ID "${department_id}" removed successfully.`);
    } catch (error) {
        console.error(`Invalid department ID: "${department_id}".`);
    }
    user_prompt();
};

const removeRole = async () => {
    const { role_id } = await inquirer.prompt([
        {
            type: "input",
            name: "role_id",
            message: "Enter the ID of the role you want to remove:",
        },
    ]);

    try {
        // Check if the role is still associated with an employee
        const employeeCheckQuery = `
            SELECT role_id 
            FROM employee
            WHERE role_id = $1 
        `;
        const employeeCheckResult = await pool.query(employeeCheckQuery, [role_id]);
        if (employeeCheckResult.rows.length > 0) {
            const employeeNameQuery = `
                SELECT first_name, last_name 
                FROM employee
                WHERE role_id = $1
            `;
            const employeeNameResult = await pool.query(employeeNameQuery, [role_id]);
            const employeeNames = employeeNameResult.rows.map(row => `${row.first_name} ${row.last_name}`).join(", ");
            console.log(`Cannot remove role. It is still associated with the following employees: ${employeeNames}.`);
            return user_prompt();
        }
        // If no associations found, proceed to delete the role
        const query = "DELETE FROM role WHERE id = $1";
        await pool.query(query, [role_id]);
        console.log(`Role with ID "${role_id}" removed successfully.`);
    } catch (error) {
        console.error(`Invalid role ID: ${role_id}.`);
    }
    user_prompt();
};

const removeEmployee = async () => {
    const { employee_id } = await inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "Enter the ID of the employee you want to remove:",
        },
    ]);

    try {
        const employeeNameQuery = `
        SELECT first_name, last_name 
        FROM employee
        WHERE id = $1
        `;
        const employeeNameResult = await pool.query(employeeNameQuery, [employee_id]);
        const { first_name, last_name } = employeeNameResult.rows[0];
        console.log(`Employee "${first_name} ${last_name}" removed successfully.`);
        const query = "DELETE FROM employee WHERE id = $1";
        await pool.query(query, [employee_id]);
    } catch (error) {
        console.error(`Invalid employee ID: ${employee_id}.`);
    }
    user_prompt();
};

const remove = {
    removeDepartment,
    removeRole,
    removeEmployee,
};

export default remove;