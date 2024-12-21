// index.js
import './styles.css'; // Import CSS styles
import { Todo, ProjectManager } from './appLogic'; // Import core logic
import UI from './ui'; // Import UI module

// Initial render: Display projects and todos
const projects = ProjectManager.getProjects();
UI.renderProjects(projects); // Display all projects
UI.renderTodos(projects[0].todos); // Display todos for the default project

// Add a new todo
document.getElementById('add-todo').addEventListener('click', () => {
  const project = projects[0]; // Use the default project for now
  const newTodo = Todo('Sample Todo', 'This is a sample description', new Date(), 'High');
  project.addTodo(newTodo);

  // Re-render the todo list
  UI.renderTodos(project.todos);
});

// Switch between projects
document.getElementById('project-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('project-item')) {
    const projectIndex = e.target.dataset.index; // Get the project index
    const project = projects[projectIndex];
    UI.renderTodos(project.todos); // Display todos for the selected project
  }
});

// Delete a todo
document.getElementById('todo-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-todo')) {
    const todoIndex = e.target.dataset.index; // Get the todo index
    projects[0].removeTodo(todoIndex); // Remove the todo
    UI.renderTodos(projects[0].todos); // Re-render the updated todo list
  }
});
