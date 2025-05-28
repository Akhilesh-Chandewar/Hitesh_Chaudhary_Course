const fs = require('fs');
const path = require('path');

// Always use the current working directory
const filePath = path.join(process.cwd(), './todo/todos.json');

console.log(`Using file: ${filePath}`);

function readTodos() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function writeTodos(todos) {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf8');
}

function addTask(args) {
    const todos = readTodos();
    const task = args.join(" ");
    if (task) {
        todos.push({ task, completed: false });
        writeTodos(todos);
        console.log(`Task added: ${task}`);
    } else {
        console.log("Please provide a task to add.");
    }
}

function toggleTaskCompletion(args) {
    const todos = readTodos();
    const index = parseInt(args[0], 10) - 1;
    if (isNaN(index) || index < 0 || index >= todos.length) {
        console.log("Invalid task number.");
        return;
    }
    todos[index].completed = !todos[index].completed;
    writeTodos(todos);
    console.log(`Task ${index + 1} marked as ${todos[index].completed ? 'completed' : 'not completed'}.`);
}

function listTasks() {
    const todos = readTodos();
    if (todos.length === 0) {
        console.log("No tasks found.");
    } else {
        todos.forEach((todo, index) => {
            console.log(`${index + 1}. [${todo.completed ? 'x' : ' '}] ${todo.task}`);
        });
    }
}

function removeTask(args) {
    const todos = readTodos();
    const index = parseInt(args[0], 10) - 1;
    if (isNaN(index) || index < 0 || index >= todos.length) {
        console.log("Invalid task number.");
        return;
    }
    const removedTask = todos.splice(index, 1);
    writeTodos(todos);
    console.log(`Task removed: ${removedTask[0].task}`);
}

function updateTask(args) {
    const todos = readTodos();
    const index = parseInt(args[0], 10) - 1;
    if (isNaN(index) || index < 0 || index >= todos.length) {
        console.log("Invalid task number.");
        return;
    }
    const newTask = args.slice(1).join(" ");
    if (newTask) {
        todos[index].task = newTask;
        writeTodos(todos);
        console.log(`Task updated: ${newTask}`);
    } else {
        console.log("Please provide a new task description.");
    }
}

const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
    case "add":
        addTask(args);
        break;
    case "toggle":
        toggleTaskCompletion(args);
        break;
    case "list":
        listTasks();
        break;
    case "remove":
        removeTask(args);
        break;
    case "update":
        updateTask(args);
        break;
    default:
        console.log("Unknown command");
        break;
}
