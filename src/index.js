// index.js
import './styles.css';
import { Todo, ProjectManager } from './appLogic';
import UI from './ui';

// Initial render: Display projects and todos
const projects = ProjectManager.getProjects();
UI.renderProjects(projects);
UI.renderTodos(projects[0].todos);

// Add a new todo
document.getElementById('add-todo').addEventListener('click', () => {
  const project = projects[0]; // Use the default project for now
  const newTodo = Todo('Sample Todo', 'This is a sample description', new Date(), 'High');
  project.addTodo(newTodo);

  ProjectManager.save(); // Save changes to localStorage
  UI.renderTodos(project.todos); // Re-render the todo list
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
    ProjectManager.save(); // Save changes to localStorage
    UI.renderTodos(projects[0].todos); // Re-render the updated todo list
  }
});
