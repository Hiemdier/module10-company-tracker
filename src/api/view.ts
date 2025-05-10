import { QueryResult } from "pg";
import {pool} from "../connection.js";
import user_prompt from "../server.js";

const viewDepartment = async () => {
    try {
        const query = "SELECT * FROM department";
        const result: QueryResult = await pool.query(query);
        console.table(result.rows);
    } catch (error) {
        console.error("Error viewing departments:", error);
    }
    user_prompt();
};

const viewRole = async () => {
    try {
        const query = "SELECT * FROM role";
        const result: QueryResult = await pool.query(query);
        console.table(result.rows);
    } catch (error) {
        console.error("Error viewing roles:", error);
    }
    user_prompt();
};

const viewEmployee = async () => {
    try {
        const query = "SELECT * FROM employee";
        const result: QueryResult = await pool.query(query);
        console.table(result.rows);
    } catch (error) {
        console.error("Error viewing employees:", error);
    }
    user_prompt();
};

const viewEmployeeByManager = async () => {
    try {
        const query = `
            SELECT e.first_name, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee e
            LEFT JOIN employee m ON e.manager_id = m.id
        `;
        const result: QueryResult = await pool.query(query);
        console.table(result.rows);
    } catch (error) {
        console.error("Error viewing employees by manager:", error);
    }
    user_prompt();
};

const viewEmployeeByDepartment = async () => {
    try {
        const query = `
            SELECT e.first_name, e.last_name, d.department_name AS department
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
        `;
        const result: QueryResult = await pool.query(query);
        console.table(result.rows);
    } catch (error) {
        console.error("Error viewing employees by department:", error);
    }
    user_prompt();
};

const viewBudget = async () => {
    try {
        const query = `
            SELECT d.department_name AS department, SUM(r.salary) AS budget
            FROM department d
            JOIN role r ON d.id = r.department_id
            JOIN employee e ON r.id = e.role_id
            GROUP BY d.department_name
        `;
        const result: QueryResult = await pool.query(query);
        console.table(result.rows);
    } catch (error) {
        console.error("Error viewing budget by department:", error);
    }
    user_prompt();
}

const view = {
    viewDepartment,
    viewRole,
    viewEmployee,
    viewEmployeeByManager,
    viewEmployeeByDepartment,
    viewBudget
};

export default view;