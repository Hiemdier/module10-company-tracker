import inquirer from "inquirer";
import {pool} from "../connection.js";
import user_prompt from "../server.js";


const updateEmployee = async () => {
    const full_name = inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the first name of the employee you want to update:",
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the last name of the employee you want to update:",
        },
    ]);
    const {first_name: old_first_name, last_name: old_last_name} = await full_name;
    const {first_name, last_name, role_id, manager_id} = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the new first name of the employee you want to update:",
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the new last name of the empolyee you want to update:",
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the new role ID for this employee:",
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter the new manager ID for this employee:",
        },
    ]);

    try {
        const firstNameValue = first_name ? first_name : old_first_name;
        const lastNameValue = last_name ? last_name : old_last_name;
        const roleIdValue = role_id ? role_id : null;
        const managerIdValue = manager_id ? manager_id : null;
        const query = `UPDATE employee SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 WHERE first_name = $5 AND last_name = $6`;
        await pool.query(query, [firstNameValue, lastNameValue, roleIdValue, managerIdValue, old_first_name, old_last_name]);
        console.log(`Employee "${old_first_name} ${old_last_name}" updated successfully.`);
    } catch (error) {
        console.error("Error updating employee:", error);
    }
    finally {
        user_prompt();
    }
};

const updateRole = async () => {
    const {role_id} = await inquirer.prompt([
        {
            type: "input",
            name: "role_id",
            message: "Enter the ID of the role you want to update:",
        },
    ]);

    const {new_title, new_salary, new_department} = await inquirer.prompt([
        {
            type: "input",
            name: "new_title",
            message: "Enter the new title for this role:",
        },
        {
            type: "input",
            name: "new_salary",
            message: "Enter the new salary for this role:",
        },
        {
            type: "input",
            name: "new_department",
            message: "Enter the new department ID for this role:",
        },
    ]);

    try {
        const currentRole = await pool.query("SELECT * FROM role WHERE id = $1", [role_id]);
        if (currentRole.rows.length === 0) {
            console.error(`Role with ID "${role_id}" not found.`);
            return;
        }

        const updatedTitle = new_title || currentRole.rows[0].title;
        const updatedSalary = new_salary || currentRole.rows[0].salary;
        const updatedDepartment = new_department || currentRole.rows[0].department_id;

        const query = "UPDATE role SET title = $1, salary = $2, department_id = $3 WHERE id = $4";
        await pool.query(query, [updatedTitle, updatedSalary, updatedDepartment, role_id]);
    } catch (error) {
        console.error("Error updating role:", error);
    }
    user_prompt();
};

const updateDepartment = async () => {
    const {department_id} = await inquirer.prompt([
        {
            type: "input",
            name: "department_id",
            message: "Enter the ID of the department you want to update:",
        },
    ]);

    const {new_name} = await inquirer.prompt([
        {
            type: "input",
            name: "new_name",
            message: "Enter the new name for this department:",
        },
    ]);

    try {
        const query = "UPDATE department SET department_name = $1 WHERE id = $2";
        await pool.query(query, [new_name, department_id]);
        console.log(`Department with ID "${department_id}" updated successfully.`);
    }
    catch (error) {
        console.error("Error updating department:", error);
    }
    finally {
        user_prompt();
    }
};

const update = {
    updateEmployee,
    updateRole,
    updateDepartment,
};
export default update;