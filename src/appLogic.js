// appLogic.js

// Factory function to create a Todo object
const Todo = (title, description, dueDate, priority, notes = '', checklist = []) => {
    // Private variable to track completion status
    let completed = false;
  
    // Method to toggle the completion status
    const toggleComplete = () => {
      completed = !completed;
    };
  
    // Return the public API of the Todo object
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
    // Array to hold all todos associated with this project
    const todos = [];
  
    // Method to add a new todo to the project
    const addTodo = (todo) => {
      todos.push(todo);
    };
  
    // Method to remove a todo by its index
    const removeTodo = (index) => {
      todos.splice(index, 1);
    };
  
    // Return the public API of the Project object
    return {
      name,
      todos,
      addTodo,
      removeTodo,
    };
  };
  
  // Module to manage all projects
  const ProjectManager = (() => {
    // Initialize with a default project
    const projects = [Project('Default')];
  
    // Method to get all projects
    const getProjects = () => projects;
  
    // Method to add a new project
    const addProject = (name) => projects.push(Project(name));
  
    // Method to get a specific project by its index
    const getProject = (index) => projects[index];
  
    // Return the public API of the ProjectManager module
    return { getProjects, addProject, getProject };
  })();
  
  // Export the Todo, Project, and ProjectManager for use in other files
  export { Todo, Project, ProjectManager };
  