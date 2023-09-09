import { createTodo, addItem, deleteTodo, getItems, toggleComplete, getTodaysItems } from './todoController';
import './style.css';

export default function dashboard(selectedProject = 'Inbox', isCreate = true) {
    const content = document.querySelector('#content');
    const main = document.querySelector('main');
    const todoContainer = document.createElement('div');
    const todoListContainer = document.createElement('div');
    const todoList = document.createElement('ul');
    const createForm = document.createElement('div');
    const titleInput = document.createElement('input');
    const descInput = document.createElement('input');
    const dateInput = document.createElement('input');
    const priorityDropdown = document.createElement('select');
    const noneOption = document.createElement('option');
    const highOption = document.createElement('option');
    const medOption = document.createElement('option');
    const lowOption = document.createElement('option');
    const submitButton = document.createElement('button');
    const addButton = document.createElement('button');


    noneOption.textContent = 'None';
    highOption.append('High');
    medOption.textContent = 'Medium';
    lowOption.textContent = 'Low';

    highOption.style.color = 'red';
    medOption.style.color = 'green';
    lowOption.style.color = 'blue';

    priorityDropdown.append(noneOption, highOption, medOption, lowOption);
    
    todoContainer.classList.add('todo-container')
    addButton.textContent = '+';
    addButton.classList.add('add');

    titleInput.placeholder = 'Title';
    descInput.placeholder = 'Description';
    dateInput.setAttribute('type', 'date');
    submitButton.textContent = 'Add task';

    createForm.classList.add('create-form');
    
    createForm.append(titleInput, descInput, dateInput, priorityDropdown, submitButton);

    todoListContainer.append(todoList);

    if (isCreate) {
        todoContainer.append(addButton)
    }

    todoContainer.append(createForm, todoListContainer);
    main.append(todoContainer);

    content.append(main);


    addButton.addEventListener('click', () => {
        // const result = createTodo('Do Something', 'Description of the stuff')
        // console.log(result);
        createForm.classList.toggle('form-visible')
    })

    submitButton.addEventListener('click', () => {
        const result = createTodo(titleInput.value, descInput.value, dateInput.value, selectedProject, priorityDropdown.value);
        titleInput.value = '';
        descInput.value = '';
        console.log(result);
        addItem(result);
        createForm.classList.remove('form-visible')
        renderTodos();
    })


    //to display items when dashboard() is called
    renderTodos();

    function renderTodos() {
        todoList.textContent = '';
        console.log("Here" + selectedProject);
        let items;
        if (isCreate) {
            items = getItems(selectedProject);
        } else {
            items = getTodaysItems();
        }
        console.log("Items");
        console.log(items);
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            const checkBox = document.createElement('input');
            const todoContent = document.createElement('div');
            const todoTitle = document.createElement('p');
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('material-icons');
            deleteButton.textContent = 'delete';
            deleteButton.setAttribute('data-id', index)

            todoTitle.textContent = item.title;

            listItem.classList.add('todo-item');
            checkBox.setAttribute('type', 'checkbox')
            checkBox.setAttribute('data-id', index);

            todoContent.append(todoTitle);
            
            if(item.isComplete) {
                todoContent.classList.add('complete');
                checkBox.checked = true;
            }

            if(item.priority === 'High') {
                checkBox.classList.add('high');
            } else if (item.priority === 'Medium') {
                checkBox.classList.add('medium');
            } else if (item.priority === 'Low') {
                checkBox.classList.add('low');
            } else {
                checkBox.style.border = '1px solid grey'
            }

            checkBox.addEventListener('change', function() {
                // toggleComplete(+this.dataset.id);
                toggleComplete(item.id);
                if(this.checked) {
                    todoContent.classList.add('complete');
                } else {
                    todoContent.classList.remove('complete');
                }
            })

            deleteButton.addEventListener('click', function() {
                deleteTodo(+this.dataset.id);
                renderTodos();
            })

            listItem.append(checkBox, todoContent, deleteButton);
            todoList.append(listItem);
        })
    }
}