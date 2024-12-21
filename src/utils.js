// utils.js

// Helper function to create a DOM element with specified properties
const createElement = (type, className = '', content = '') => {
    const element = document.createElement(type); // Create the element
    if (className) element.className = className; // Add a class name if provided
    if (content) element.textContent = content; // Add content if provided
    return element; // Return the created element
  };
  
  export { createElement };
  