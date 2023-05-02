const { prompt, default: inquirer } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();
//init function which contains the text logo
function init() {
    const logoText = logo({ name: "Employee Manager"}).render();

    console.log(logoText);
}
//function to load inquirer prompt, giving choices a name and value to drill in in the .then
function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                } 
            ]
        } //.then which calls all methods in ./db/index.js using an if statement
    ]).then((res) => {
        if (res.choice === "VIEW_EMPLOYEES") {
            db.findAllEmployees().then(([rows]) => {
                console.table(rows)
                loadMainPrompts();
            })
            //this else if adds employees so a prompt will be shown to input needed information
        } else if(res.choice === "ADD_EMPLOYEE") {
            prompt([
                {
                    type: "input",
                    name: "addfirstname",
                    message: "What is the first name of the employee?"   
                },
                {
                    type: "input",
                    name: "addlastname",
                    message: "What is the last name of the employee?"   
                },
                {
                    type: "input",
                    name: "addroleid",
                    message: "What is the role ID of the employee?"   
                },
                {
                    type: "input",
                    name: "addmgrid",
                    message: "What is the manager ID of the employee (if applicable)?"   
                }
            ]).then((res) => {
                db.addEmployee(res.addfirstname, res.addlastname, res.addroleid, res.addmgrid || null )
                .then(([rows]) => {
                    console.table(rows)
                    loadMainPrompts();
                })
            })
            //this else if updates employee roles so a prompt will be shown to input needed information
        } else if(res.choice === "UPDATE_EMPLOYEE_ROLE") {
            prompt([
                {
                    type: "input",
                    name: "employeeid",
                    message: "What is the ID of the employee you are updating?"   
                },
                {
                    type: "input",
                    name: "addnewroleid",
                    message: "What is the new role ID of the employee?"   
                }
            ]).then((res) => {
                db.updateRole(res.addnewroleid, res.employeeid)
                .then(([rows]) => {
                    console.table(rows)
                    loadMainPrompts();
                })
            })

        } else if(res.choice === "VIEW_ROLES") {
            db.findAllRoles().then(([rows]) => {
                console.table(rows)
                loadMainPrompts();
            })
            //this else if adds roles so a prompt will be shown to input needed information
        } else if(res.choice === "ADD_ROLE") {
            prompt([
                {
                    type: "input",
                    name: "addtitle",
                    message: "What is the title of the role?"   
                },
                {
                    type: "input",
                    name: "addsalary",
                    message: "What is the salary for the role?"   
                },
                {
                    type: "input",
                    name: "adddptid",
                    message: "What is the department ID for the role?"   
                }
            ]).then((res) => {
                db.addRole(res.addtitle, res.addsalary, res.adddptid)
                .then(([rows]) => {
                    console.table(rows)
                    loadMainPrompts();
                })
            })

        } else if(res.choice === "VIEW_DEPARTMENTS") {
            db.findAllDepartments().then(([rows]) => {
                console.table(rows)
                loadMainPrompts();
            })
            //this else if adds departments so a prompt will be shown to input needed information
        } else if(res.choice === "ADD_DEPARTMENT") {
            prompt([
                {
                    type: "input",
                    name: "addname",
                    message: "What is the name of the department you would like to add?"   
                }
            ]).then((res) => {
                db.addDept(res.addname)
                .then(([rows]) => {
                    console.table(rows)
                    loadMainPrompts();
                })
            })
        }
    }).catch ((err) =>  {
        console.log(err);
     })
};

loadMainPrompts();