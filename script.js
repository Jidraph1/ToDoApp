
let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const form = document.querySelector('.inputform');
const newTodo = document.getElementById('newinput');
const checkbox = document.querySelector('#checkBox');
const itemsLeft = document.getElementById('items-left');
const clearBtn = document.getElementById('clearStorage');
const taskContainer = document.querySelector('.lower-inner');

checkbox.addEventListener('click', () => {
  // console.log(checkbox.checked);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (newTodo.value !== '') {
    const task = {
      task: newTodo.value,
      checked: checkbox.checked,
    };

    allTasks.push(task);

    newTodo.value = '';
    checkbox.checked = false;

    renderTasks('all');
    updateItemCount();
    saveTasksToLocalStorage();
  }
});

function renderTasks(filter) {
  let filteredTasks = allTasks;

  if (filter === 'active') {
    filteredTasks = allTasks.filter(task => !task.checked);
  } else if (filter === 'completed') {
    filteredTasks = allTasks.filter(task => task.checked);
  }

  taskContainer.innerHTML = '';

  filteredTasks.forEach(({ task, checked }) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'taskitem';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'itemcheckbox';
    checkbox.checked = checked;

    const taskContent = document.createElement('div');
    taskContent.className = 'singletask';
    taskContent.textContent = task;
    taskContent.style.textDecoration = checked ? 'line-through' : 'none';

    checkbox.addEventListener('click', () => {
      taskContent.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
      updateItemCount();
      saveTasksToLocalStorage();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskContent);

    taskContainer.appendChild(taskItem);
  });
}

function updateItemCount() {
  const uncheckedCount = allTasks.filter(task => !task.checked).length;
  itemsLeft.textContent = uncheckedCount;
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function clearLocalStorage() {
  localStorage.removeItem('tasks');
  allTasks = [];
  renderTasks('all');
  updateItemCount();
}

clearBtn.addEventListener('click', clearLocalStorage);

const allItemsBtn = document.getElementById('all-items');
allItemsBtn.addEventListener('click', () => {
  renderTasks('all');
  updateItemCount();
});

const activeBtn = document.getElementById('active');
activeBtn.addEventListener('click', () => {
  renderTasks('active');
  updateItemCount();
});

const completedBtn = document.getElementById('completed');
completedBtn.addEventListener('click', () => {
  renderTasks('completed');
  updateItemCount();
});

renderTasks('all');
updateItemCount();
