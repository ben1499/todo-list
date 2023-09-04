import { createTodo, addItem, getItems } from './todoController';
import './style.css';

export default function displayController() {
    const content = document.querySelector('#content');
    const todoContainer = document.createElement('div');
    const todoListContainer = document.createElement('div');
    const todoList = document.createElement('ul');
    const createForm = document.createElement('div');
    const titleInput = document.createElement('input');
    const descInput = document.createElement('input');
    const submitButton = document.createElement('button');
    const addButton = document.createElement('button');

    
    todoContainer.classList.add('todo-container')
    addButton.textContent = '+';
    addButton.classList.add('add');

    titleInput.placeholder = 'Title';
    descInput.placeholder = 'Description';
    submitButton.textContent = 'Add task';

    createForm.classList.add('create-form');
    
    createForm.append(titleInput, descInput, submitButton);

    todoListContainer.append(todoList);

    todoContainer.append(addButton, createForm, todoListContainer);
    content.append(todoContainer);

    addButton.addEventListener('click', () => {
        // const result = createTodo('Do Something', 'Description of the stuff')
        // console.log(result);
        createForm.classList.toggle('visible')
    })

    submitButton.addEventListener('click', () => {
        const result = createTodo(titleInput.value, descInput.value)
        titleInput.value = '';
        descInput.value = '';
        console.log(result);
        addItem(result);
        createForm.classList.remove('visible')
        renderTodos();
    })

    function renderTodos() {
        todoList.textContent = '';
        const items = getItems();
        items.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.title;
            todoList.append(listItem);
        })
    }
}