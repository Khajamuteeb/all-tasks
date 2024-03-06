const form = document.querySelector('#task-form');
const inputTask = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-btn');

loadEventListener();

function loadEventListener() {
  
  document.addEventListener('DOMContentLoaded', loadTasks);
  
  form.addEventListener('submit', addTask);
  
  taskList.addEventListener('click', deleteTask);
  
  filter.addEventListener('keyup', filterTasks);

  clearTasks.addEventListener('click', clearTaskList);
}

function loadTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    createNewTaskElement(task);
  });
}

function createNewTaskElement(task) {
  const newTask = document.createElement('li');
  newTask.className = 'collection-item';
  newTask.appendChild(document.createTextNode(task));
  const newTaskATag = document.createElement('a');
  newTaskATag.style.cursor = 'pointer';
  newTaskATag.style.color = '#e01a4f';
  newTaskATag.className = 'delete-item secondary-content';
  newTaskATag.innerHTML = '<i class="material-icons">delete</i>';

  newTask.appendChild(newTaskATag);

  taskList.appendChild(newTask);
}

function addTask(e) {
  if (inputTask.value === '') {
    M.toast({ html: 'Add a task', classes: 'red rounded' });
  } else {
    createNewTaskElement(inputTask.value);

    storeTaskInLocalStorage(inputTask.value);

    inputTask.value = '';
  }
  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function deleteTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(
        e.target.parentElement.parentElement.firstChild.textContent
      );
    }
  }
}

function removeTaskFromLocalStorage(taskToDelete) {
  let tasks;
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(function (task) {
    if (task === taskToDelete) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  //Iterates through each task and checks if filter input matches it
  document.querySelectorAll('.collection-item').forEach(function (task) {
    item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}


function clearTaskList() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}
