import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';

const todoListArray = [];
const projects = ['Inbox'];
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
    item.id = itemID++;
    
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

export { 
    createTodo, 
    addItem, 
    deleteTodo, 
    getTodaysItems,
    toggleComplete,
    getItems, 
    addProject, 
    getProjects, 
    deleteProject
}
