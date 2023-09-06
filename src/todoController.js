

const todoListArray = [];
const projects = ['Inbox'];

const createTodo = (title, description, dueDate, priority) => {
    const todoItems = [];
        return {
            title,
            description,
            dueDate,
            priority,
        }
}


const addItem = (item) => {
    todoListArray.push(item);
    console.log(todoListArray);
}

const removeItem = (index) => {
    todoListArray.splice(index, 1);
}

const getItems = () => todoListArray;

const addProject = (item) => {
    projects.push(item);
    console.log(projects);
}

const getProjects = () => projects;

export { createTodo, addItem, getItems, addProject, getProjects }
