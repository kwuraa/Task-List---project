const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-form");
const button = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#todo-list");

let tasks = []; // [{title: Tarefa 1, done: true}...]

function renderTaskOnHTML(taskTitle, done = false) {
  const li = document.createElement("li");
  li.setAttribute("class", "task-list"); // !
  const checked = document.createElement("input"); // <input />
  checked.setAttribute("class", "checkbox-list"); // !
  checked.setAttribute("type", "checkbox"); // <input type:checkbox />
  checked.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement;

    const spanToToggle = liToToggle.querySelector("span");

    const done = event.target.checked;
    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }

      return t;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  checked.checked = done;

  const span = document.createElement("span");
  span.setAttribute("class", "task-title");
  span.textContent = taskTitle;

  if (done) {
    span.style.textDecoration = "line-through";
  }

  const removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "remove-btn material-symbols-outlined");
  removeBtn.textContent = "delete";
  removeBtn.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;

    const titleToRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.title !== titleToRemove);

    taskList.removeChild(liToRemove);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(checked);
  li.appendChild(span);
  li.appendChild(removeBtn);

  taskList.appendChild(li);
}

window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");

  if (!tasksOnLocalStorage) return;

  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHTML(t.title, t.done);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita o comportamento padrão de recarregar a pagina ao submeter o form

  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter, pelo menos, 3 caracteres.");
    inputCleaner();
    return;
  } else if (taskTitle.length > 40) {
    alert("Sua tarefa é muito longa.");
    taskTitleInput.value;
    inputCleaner();
    return;
  }

  // Add a nova tarefa ao Array
  tasks.push({
    title: taskTitle,
    done: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Add a nova tarefa ao HTML
  renderTaskOnHTML(taskTitle);

  inputCleaner();

  function inputCleaner() {
    taskTitleInput.value = "";
  }
});
