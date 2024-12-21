// appLogic.js

// Factory function to create a Todo object
const Todo = (title, description, dueDate, priority, notes = '', checklist = []) => {
  let completed = false;

  const toggleComplete = () => {
    completed = !completed;
  };

  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    completed,
    toggleComplete,
  };
};

// Factory function to create a Project object
const Project = (name) => {
  const todos = [];

  const addTodo = (todo) => {
    todos.push(todo);
  };

  const removeTodo = (index) => {
    todos.splice(index, 1);
  };

  return {
    name,
    todos,
    addTodo,
    removeTodo,
  };
};

// Module to manage all projects
const ProjectManager = (() => {
  let projects = [];

  // Load projects from localStorage
  const loadProjects = () => {
    const data = localStorage.getItem('projects');
    if (!data) {
      projects = [Project('Default')]; // Create a default project if no data exists
    } else {
      const parsedProjects = JSON.parse(data);
      projects = parsedProjects.map((project) => {
        const restoredProject = Project(project.name);
        project.todos.forEach((todo) => {
          const restoredTodo = Todo(
            todo.title,
            todo.description,
            todo.dueDate,
            todo.priority,
            todo.notes,
            todo.checklist
          );
          if (todo.completed) restoredTodo.toggleComplete();
          restoredProject.addTodo(restoredTodo);
        });
        return restoredProject;
      });
    }
  };

  // Save projects to localStorage
  const saveProjects = () => {
    const data = JSON.stringify(projects);
    localStorage.setItem('projects', data);
  };

  const getProjects = () => projects;

  const addProject = (name) => {
    projects.push(Project(name));
    saveProjects(); // Save after adding a project
  };

  const getProject = (index) => projects[index];

  const save = () => saveProjects(); // Expose save function for external use

  loadProjects(); // Automatically load projects when the app initializes

  return { getProjects, addProject, getProject, save };
})();

export { Todo, Project, ProjectManager };
