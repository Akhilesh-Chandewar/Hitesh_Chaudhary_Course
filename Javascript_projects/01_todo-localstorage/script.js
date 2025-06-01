document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
    const toggle = document.getElementById("mode-toggle");

    // Load dark mode state
    if (localStorage.getItem("darkMode") === "true") {
        toggle.checked = true;
        document.body.classList.add("dark-mode");
    }

    // Load saved tasks
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });

    addButton.addEventListener("click", () => {
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTaskToDOM(taskText, false);
            saveTasks();
            input.value = "";
        }
    });

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addButton.click();
        }
    });

    toggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode", toggle.checked);
        localStorage.setItem("darkMode", toggle.checked);
    });

    function addTaskToDOM(text, completed) {
        const li = document.createElement("li");
        li.textContent = text;
        if (completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#todo-list li").forEach(li => {
            tasks.push({
                text: li.childNodes[0].textContent.trim(),
                completed: li.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
