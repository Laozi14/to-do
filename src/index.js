// index.js
import './styles.css';
import { Todo, ProjectManager } from './appLogic';
import UI from './ui';

// Initial render: Display projects and todos
const projects = ProjectManager.getProjects();
UI.renderProjects(projects);
UI.renderTodos(projects[0].todos);

// Track the currently selected project (default to the first project)
let currentProjectIndex = 0;

// Event listener for adding a new project
document.getElementById('add-project-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const projectName = document.getElementById('project-name').value.trim();
  if (projectName) {
    ProjectManager.addProject(projectName);
    UI.renderProjects(ProjectManager.getProjects());
    document.getElementById('project-name').value = ''; // Clear input
  }
});

// Event listener for switching between projects
document.getElementById('project-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('project-item')) {
    currentProjectIndex = e.target.dataset.index; // Update the current project index
    const project = projects[currentProjectIndex];
    UI.renderTodos(project.todos); // Display todos for the selected project
  }
});

// Event listener for adding a new todo
document.getElementById('add-todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('todo-title').value.trim();
  const dueDate = document.getElementById('todo-due-date').value;
  const priority = document.getElementById('todo-priority').value;

  if (title && dueDate) {
    const newTodo = Todo(title, '', dueDate, priority);
    const project = projects[currentProjectIndex];
    project.addTodo(newTodo);

    ProjectManager.save(); // Save changes to localStorage
    UI.renderTodos(project.todos); // Re-render todos
    document.getElementById('add-todo-form').reset(); // Clear form
  }
});

// Event listener for deleting a todo
document.getElementById('todos-container').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-todo')) {
    const todoIndex = e.target.dataset.index; // Get the todo index
    const project = projects[currentProjectIndex];
    project.removeTodo(todoIndex); // Remove the todo
    ProjectManager.save(); // Save changes to localStorage
    UI.renderTodos(project.todos); // Re-render todos
  }
});
