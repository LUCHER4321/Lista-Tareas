class Task {
    name: string = "";
    completed: boolean = false;

    constructor(name: string = "", completed: boolean = false) {
        this.name = name;
        this.completed = completed;
    }
}

let tasks: Task[] = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")!).map((t: any) => new Task(t.name, t.completed)) : [];

const addTaskButton = document.getElementById("addTask") as HTMLButtonElement;
const inProgressOutput = document.getElementById("inProgress") as HTMLDivElement;
const completedOutput = document.getElementById("completed") as HTMLDivElement;

const displayTask = (task: Task, id: number) => {
    const template = document.getElementById("taskTemplate") as HTMLTemplateElement;
    const clone = document.importNode(template.content, true);
    const label = clone.querySelector("label") as HTMLLabelElement;
    const nameInput = clone.querySelector("input[type='text']") as HTMLInputElement;
    const completedInput = clone.querySelector("input[type='checkbox']") as HTMLInputElement;
    const deleteInput = clone.querySelector("button") as HTMLButtonElement;
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

const removeChildren = (element: HTMLElement) => {
    while (element.firstChild) {
        element.firstChild.remove();
    }
};

const refreshTasks = () => {
    removeChildren(inProgressOutput);
    removeChildren(completedOutput);

    const addChild = (element: HTMLElement, child: DocumentFragment) => {
        element.appendChild(child);
    };

    tasks.forEach((task, index) => {
        addChild(task.completed ? completedOutput : inProgressOutput, displayTask(task, index));
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

addTaskButton.addEventListener("click", () => {
    tasks.push(new Task());
    refreshTasks();
});

refreshTasks();