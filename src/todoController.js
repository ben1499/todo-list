import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';

let todoListArray = [];

let projects = ['Inbox'];
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
    let existingEntries = JSON.parse(localStorage.getItem('todoListArray'));

    existingEntries.push(item);
    item.id = itemID++;

    localStorage.setItem('todoListArray', JSON.stringify(existingEntries));
    localStorage.setItem('itemID', JSON.stringify(itemID));
}

const deleteTodo = (index) => {
    todoListArray.splice(index, 1);

    let existingEntries = JSON.parse(localStorage.getItem('todoListArray'))
    existingEntries.splice(index, 1);

    localStorage.setItem('todoListArray', JSON.stringify(existingEntries));
}

const getItems = (selectedProject) => {
    return todoListArray.filter((todoItem) => todoItem.project === selectedProject);
}

const getTodaysItems = () => {
    return todoListArray.filter((todoItem) => isToday(parseISO(todoItem.dueDate)))
}

const toggleComplete = (index) => {
    todoListArray.forEach((todoItem) => {
        if (todoItem.id === index) {
            todoItem.isComplete  = !todoItem.isComplete;
        }
    })

    localStorage.setItem('todoListArray', JSON.stringify(todoListArray));
}

const addProject = (item) => {
    projects.push(item);

    let existingEntries = JSON.parse(localStorage.getItem('projects'));

    existingEntries.push(item);

    localStorage.setItem('projects', JSON.stringify(existingEntries));



    
}

const deleteProject = (index) => {
    index = index + 1;
    let projectName = projects[index];
    projects.splice(index, 1);


    todoListArray = todoListArray.filter((item) => {
        if (item.project !== projectName) {
            return item;
        }
    })

    //For local storage
    let existingEntries = JSON.parse(localStorage.getItem('projects'))
    existingEntries.splice(index, 1);

    existingEntries = existingEntries.filter((item) => {
        if (item.project !== projectName) {
            return item;
        }
    })

    localStorage.setItem('projects', JSON.stringify(existingEntries));
}

const getProjects = () => projects;


const populateLocalStorageTodoData = () => {
    if (localStorage.todoListArray) {
        let existingEntries = JSON.parse(localStorage.getItem('todoListArray'));
        todoListArray = existingEntries;
    } else {
        localStorage.setItem('todoListArray', JSON.stringify(todoListArray));
    }
}

const populateLocalStorageProjectData = () => {
    if (localStorage.projects) {
        let existingEntries = JSON.parse(localStorage.getItem('projects'));
        projects = existingEntries;
    } else {
        localStorage.setItem('projects', JSON.stringify(projects));
    }
}

const populateItemId = () => {
    if (localStorage.itemID) {
        let existingEntry = JSON.parse(localStorage.getItem('itemID'));
        itemID = existingEntry;
    } else {
        localStorage.setItem('itemID', JSON.stringify(itemID));
    }
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
    populateLocalStorageTodoData,
    populateLocalStorageProjectData,
    populateItemId,
}
