// ui.js
import { format } from 'date-fns'; // Import date formatting utility

const UI = (() => {
  // Render the list of projects in the sidebar
  const renderProjects = (projects) => {
    const projectList = document.getElementById('project-list');
    projectList.textContent = ''; // Clear the current project list

    projects.forEach((project, index) => {
      const projectItem = document.createElement('div');
      projectItem.textContent = project.name; // Set project name
      projectItem.dataset.index = index; // Store the project index
      projectItem.classList.add('project-item');
      projectList.appendChild(projectItem);
    });
  };

  // Render the list of todos for a selected project
  const renderTodos = (todos) => {
    const todoList = document.getElementById('todo-list');
    todoList.textContent = ''; // Clear the current todo list

    todos.forEach((todo, index) => {
      // Create the container for a single todo
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');

      // Title and Due Date
      const todoTitle = document.createElement('div');
      todoTitle.textContent = `${todo.title} - ${format(new Date(todo.dueDate), 'MM/dd/yyyy')}`;
      todoTitle.classList.add('todo-title');
      todoItem.appendChild(todoTitle);

      // Priority
      const todoPriority = document.createElement('div');
      todoPriority.textContent = `Priority: ${todo.priority}`;
      todoPriority.classList.add('todo-priority');
      todoItem.appendChild(todoPriority);

      // Delete Button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.dataset.index = index; // Attach index for identifying the todo
      deleteButton.classList.add('delete-todo');
      todoItem.appendChild(deleteButton);

      // Append the todo item to the list
      todoList.appendChild(todoItem);
    });
  };

  return { renderProjects, renderTodos };
})();

export default UI;
