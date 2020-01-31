const inquirer = require("inquirer");
const connection = require("./connect")
require("console.table")
startApp()
function startApp() {
    inquirer.prompt(
        {
            type : "list",
            choices : ["View Departments", "View Employees", "View Roles", "Add Departments", "Add Employees", "Add Roles", "Update Employee Roles"],
            message: "What would you like to do?",
            name: "choices" 
        }
    ) .then(
        function(userInput) {
            switch (userInput.choices) {
                case "View Departments":
                    viewDepartments()
                    break
                case "View Employees":
                    viewEmployees()
                    break
                case "View Roles":
                    viewRoles()
                    break
                case "Add Departments":
                    addDepartments()
                    break
                case "Add Employees":
                    addEmployees()
                    break
                case "Add Roles":
                    addRoles()
                    break
                case "Update Roles":
                    updateRoles()
                    break             
            }       
        }
    )
}

function viewDepartments() {
    connection.query("SELECT * FROM DEPARTMENT", function(err, data){
        console.table(data)
        startApp()
    })
}
function viewEmployees() {
    connection.query("SELECT * FROM EMPLOYEES", function(err, data){
        console.table(data)
        startApp()
    })
}
function viewRoles() {
    connection.query("SELECT * FROM ROLES", function(err, data){
        console.table(data)
        startApp()
    })
}
function addDepartments() {
    inquirer.prompt(
        {
            type : "input",
            message : "What is the name of the department you would like to add?",
            name : "departmentName"
        }
    ).then(function(userInput){
        connection.query("INSERT INTO DEPARTMENT (department) values(?)", userInput.departmentName, function(err, data) {
            startApp()
        })
    }) 
    

}
function addEmployees() {
    inquirer.prompt([
        {
            type : "input",
            message : "What is homie's first name?",
            name : "FIRST_NAME"
        },
        {
            type : "input",
            message : "What is homie's last name?",
            name : "LAST_NAME"
        },
        {
            type : "input",
            message : "What is homie's job ID?",
            name : "ROLE_ID"
        },
        {
            type : "input",
            message : "Who does homie work for?",
            name : "MANAGER_ID"
        }
    ]).then(function(userInput){
        console.log(userInput);
        connection.query("INSERT INTO EMPLOYEES set ?", userInput, function(err, data) {
            console.log(data)
            startApp()
        })
    }) 
}

function addRoles() {
    inquirer.prompt([
        {
            type : "input",
            message : "What is the name of the role you would like to add?",
            name : "TITLE"
        },
        {
            type : "input",
            message : "How much $$$ does this person make?",
            name : "SALARY"
        },
        {
            type : "input",
            message : "What department is homie in?",
            name : "DEPARTMENT"
        }
    ]).then(function(userInput){
        connection.query("INSERT INTO ROLES set ?", userInput, function(err, data) {
            console.log(data)
            startApp()
        })
    }) 
}
function updateRoles() {}