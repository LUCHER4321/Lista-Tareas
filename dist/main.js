"use strict";
class Task {
    constructor(name = "", completed = false) {
        this.name = "";
        this.completed = false;
        this.name = name;
        this.completed = completed;
    }
}
let tasks = [];
const addTaskButton = document.getElementById("addTask");
const inProgressOutput = document.getElementById("inProgress");
const completedOutput = document.getElementById("completed");
const displayTask = (task, id) => {
    const template = document.getElementById("taskTemplate");
    const clone = document.importNode(template.content, true);
    const label = clone.querySelector("label");
    const nameInput = clone.querySelector("input[type='text']");
    const completedInput = clone.querySelector("input[type='checkbox']");
    const deleteInput = clone.querySelector("button");
    label.id = `task-${id}`;
    nameInput.id = `name-${id}`;
    nameInput.value = task.name;
    completedInput.checked = task.completed;
    nameInput.addEventListener("change", () => task.name = nameInput.value);
    completedInput.addEventListener("change", () => {
        task.completed = completedInput.checked;
        refreshTasks();
    });
    deleteInput.addEventListener("click", () => {
        tasks = tasks.filter(t => t !== task);
        refreshTasks();
    });
    return clone;
};
const removeChildren = (element) => {
    while (element.firstChild) {
        element.firstChild.remove();
    }
};
const refreshTasks = () => {
    removeChildren(inProgressOutput);
    removeChildren(completedOutput);
    const addChild = (element, child) => {
        element.appendChild(child);
    };
    tasks.forEach((task, index) => {
        addChild(task.completed ? completedOutput : inProgressOutput, displayTask(task, index));
    });
};
addTaskButton.addEventListener("click", () => {
    tasks.push(new Task());
    refreshTasks();
});
