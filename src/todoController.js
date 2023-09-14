import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';

const todoListArray = [];
const sampleArray = ['hello'];
localStorage.setItem('todoListArray', JSON.stringify(todoListArray));

const projects = ['Inbox'];
localStorage.setItem('projects', JSON.stringify(projects));
let itemID = 0;

const createTodo = (title, description, dueDate, project, priority, isComplete = false) => {
        return {
            title,
            description,
            dueDate,
            project,
            priority,
            isComplete,
        }
}



const addItem = (item) => {
    todoListArray.push(item);
    console.log(todoListArray);
    let existingEntries = JSON.parse(localStorage.getItem('todoListArray'));

    existingEntries.push(item);
    item.id = itemID++;

    localStorage.setItem('todoListArray', JSON.stringify(existingEntries));

    
    
}

const deleteTodo = (index) => {
    todoListArray.splice(index, 1);
}

const getItems = (selectedProject) => {
    return todoListArray.filter((todoItem) => todoItem.project === selectedProject);
}

const getTodaysItems = () => {
    return todoListArray.filter((todoItem) => isToday(parseISO(todoItem.dueDate)))
}

const toggleComplete = (index) => {
    // todoListArray[index].isComplete = !todoListArray[index].isComplete;
    // console.log(todoListArray);
    todoListArray.forEach((todoItem) => {
        if (todoItem.id === index) {
            todoItem.isComplete  = !todoItem.isComplete;
        }
    })
    console.log(todoListArray);
}

const addProject = (item) => {
    projects.push(item);
    console.log(projects);
}

const deleteProject = (index) => {
    index = index + 1;
    projects.splice(index, 1);
    console.log(projects);
}

const getProjects = () => projects;

const initLocalStorage = () => {
    // localStorage.setItem('todoListArray', JSON.stringify(todoListArray));
    // localStorage.setItem('projects', JSON.stringify(projects));
}

const addLocalStorageTodos = (newItem) => {
    let existingEntries = JSON.parse(localStorage.getItem('todoListArray'));
}

export { 
    createTodo, 
    addItem, 
    deleteTodo, 
    getTodaysItems,
    toggleComplete,
    getItems, 
    addProject, 
    getProjects, 
    deleteProject,
}
