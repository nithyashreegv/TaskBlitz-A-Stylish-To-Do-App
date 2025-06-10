const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const clearAllBtn = document.getElementById("clear-all");
const filters = document.querySelectorAll(".filter-options span");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "all" || task.status === filter) {
      const li = document.createElement("li");
      li.className = task.status === "completed" ? "completed" : "";

      li.innerHTML = `
        <input type="checkbox" ${task.status === "completed" ? "checked" : ""} onchange="toggleStatus(${index})">
        <span>${task.name}</span>
      `;
      taskList.appendChild(li);
    }
  });
}

function addTask(e) {
  if (e.key === "Enter" && taskInput.value.trim()) {
    tasks.push({ name: taskInput.value.trim(), status: "pending" });
    taskInput.value = "";
    saveTasks();
    renderTasks(getActiveFilter());
  }
}

function toggleStatus(index) {
  tasks[index].status = tasks[index].status === "completed" ? "pending" : "completed";
  saveTasks();
  renderTasks(getActiveFilter());
}

function getActiveFilter() {
  return document.querySelector(".filter-options span.active").id;
}

taskInput.addEventListener("keydown", addTask);

clearAllBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    renderTasks(filter.id);
  });
});

// Theme Toggle
const toggleBtn = document.getElementById("toggle-theme");
const themeLabel = document.getElementById("theme-label");

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark");
  toggleBtn.checked = true;
  themeLabel.textContent = "🌙 Dark Mode";
}

toggleBtn.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeLabel.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeLabel.textContent = "🌞 Light Mode";
    localStorage.setItem("theme", "light");
  }
});

renderTasks();
