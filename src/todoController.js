

const todoListArray = [];

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

export { createTodo, addItem, getItems }
