import { createTodo, addItem, deleteTodo, getItems, toggleComplete, getTodaysItems } from './todoController';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import './style.css';

export default function dashboard(selectedProject = 'Inbox', isCreate = true, pageTitle = 'Inbox') {
    const content = document.querySelector('#content');
    const main = document.querySelector('main');
    const overlayContainer = document.createElement('div');
    const todoContainer = document.createElement('div');
    const tabTitle = document.createElement('h1');
    const todoListContainer = document.createElement('div');
    const todoList = document.createElement('ul');
    const createForm = document.createElement('div');
    const cancelButton = document.createElement('button');
    const titleInput = document.createElement('input');
    const descInput = document.createElement('input');
    const dateInput = document.createElement('input');
    const priorityContainer = document.createElement('div');
    const priorityLabel = document.createElement('label');
    const priorityDropdown = document.createElement('select');
    const noneOption = document.createElement('option');
    const highOption = document.createElement('option');
    const medOption = document.createElement('option');
    const lowOption = document.createElement('option');
    const submitButton = document.createElement('button');
    const addButton = document.createElement('button');
    const buttonsContainer = document.createElement('div');
    const detailsModal = document.createElement('div');
    const modalCloseButton = document.createElement('button');
    const todoErrorText = document.createElement('p');


    todoErrorText.textContent = 'Task with same same already exists'
    todoErrorText.classList.add('error-text');

    const title = document.createElement('p');
    const desc = document.createElement('p');
    const date = document.createElement('p');
    const priority = document.createElement('p');

    modalCloseButton.classList.add('material-icons')
    modalCloseButton.textContent = 'close';

    modalCloseButton.classList.add('modal-close-btn');
    detailsModal.classList.add('details-modal');
    detailsModal.classList.add('hidden');
    detailsModal.append(modalCloseButton, title, desc, date, priority);

    overlayContainer.append(detailsModal);
    
    cancelButton.textContent = 'Cancel';

    noneOption.textContent = 'None';
    highOption.append('High');
    medOption.textContent = 'Medium';
    lowOption.textContent = 'Low';

    highOption.style.color = 'red';
    medOption.style.color = 'green';
    lowOption.style.color = 'blue';

    priorityLabel.setAttribute('for', 'select');

    priorityLabel.textContent = 'Priority: '

    priorityDropdown.id = 'select';
    priorityDropdown.append(noneOption, highOption, medOption, lowOption);

    priorityContainer.append(priorityLabel, priorityDropdown);
    
    todoContainer.classList.add('todo-container')
    addButton.textContent = '+ Add Task';
    addButton.classList.add('add-btn');

    titleInput.placeholder = 'Title';
    descInput.placeholder = 'Description';
    dateInput.setAttribute('type', 'date');
    submitButton.textContent = 'Add task';

    createForm.classList.add('create-form');

    buttonsContainer.classList.add('action-buttons')
    buttonsContainer.append(cancelButton, submitButton)
    
    createForm.append(titleInput, descInput, dateInput, priorityContainer, todoErrorText, buttonsContainer);

    todoListContainer.setAttribute('id', 'todo-list')
    todoListContainer.append(todoList);

    tabTitle.textContent = pageTitle;

    todoContainer.append(tabTitle);

    if (isCreate) {
        todoContainer.append(addButton)
    }

    todoContainer.append(createForm, todoListContainer);
    main.append(overlayContainer, todoContainer);

    content.append(main);


    addButton.addEventListener('click', () => {
        createForm.classList.add('form-visible')
        titleInput.focus();
    })

    cancelButton.addEventListener('click', function() {
        createForm.classList.remove('form-visible');
        titleInput.value = '';
        descInput.value = '';
        dateInput.value = '';
        priorityDropdown.selectedIndex = 0;
    }); 


    submitButton.setAttribute('disabled', true);

    titleInput.addEventListener('input', function() {
        if (this.value) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', true);
        }
    })

    submitButton.addEventListener('click', () => {
        // const todos = getItems(selectedProject);
        // const isExist = todos.map(item => item.title).includes(titleInput.value);
        // if (isExist) {
        //     todoErrorText.classList.add('error-visible');
        // } else {
        const result = createTodo(titleInput.value, descInput.value, dateInput.value, selectedProject, priorityDropdown.value);
        titleInput.value = '';
        descInput.value = '';
        addItem(result);
        createForm.classList.remove('form-visible')
        renderTodos();
        submitButton.setAttribute('disabled', true);
    })

    modalCloseButton.addEventListener('click', function(e) {
        e.stopPropagation();
        detailsModal.classList.remove('modal-visible');

        overlayContainer.removeAttribute('id', 'background-blur');
        content.style.pointerEvents = 'all';
    })

    //To highlight selected menu
    const menuItems = document.querySelectorAll("[data-name]");
    menuItems.forEach((item) => {
        item.classList.remove('selected-project');
        if (selectedProject === 'Inbox' && item.dataset.name === 'Inbox') {
            item.classList.add('selected-project');
        } else if (selectedProject === 'none' && item.dataset.name === 'Today') {
            item.classList.add('selected-project');
        } else {
            if (selectedProject === item.dataset.name) {
                item.classList.add('selected-project');
            }
        }
    })


    //to display items when dashboard() is called
    renderTodos();

    function renderTodos() {
        todoList.textContent = '';
        let items;
        if (isCreate) {
            items = getItems(selectedProject);
        } else {
            items = getTodaysItems();
        }

        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            const checkBox = document.createElement('input');
            const todoContent = document.createElement('div');
            const todoTitle = document.createElement('p');
            const dateDisplay = document.createElement('p');
            const deleteButton = document.createElement('button');
            const rightButtons = document.createElement('div');
            const detailsButton = document.createElement('button');

            dateDisplay.classList.add('date-display');

            detailsButton.classList.add('details-btn');
            detailsButton.textContent = "Details";

            deleteButton.classList.add('material-icons');
            deleteButton.classList.add('delete-btn');
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

            detailsButton.addEventListener('click', function() {
                title.textContent = `Title: ${item.title}`;
                desc.textContent = `Description: ${item.description}`;
                date.textContent = item.dueDate ? `Due Date: ${format(parseISO(item.dueDate), 'dd/MM/yyyy')}` : 'Due Date: ';
                priority.textContent = `Priority: ${item.priority}`;

                detailsModal.classList.add('modal-visible')

                overlayContainer.setAttribute('id', 'background-blur');

                content.style.pointerEvents = 'none';
                detailsModal.style.pointerEvents = 'all';
            });

            deleteButton.addEventListener('click', function() {
                deleteTodo(+this.dataset.id);
                renderTodos();
            });

            dateDisplay.classList.add('date-display');

            if (item.dueDate) {
                dateDisplay.textContent = format(parseISO(item.dueDate), 'dd/MM/yyyy');
            } else {
                dateDisplay.textContent = 'No Date';
            }
            

            rightButtons.classList.add('buttons-right');
            rightButtons.append(detailsButton, dateDisplay, deleteButton);

            listItem.append(checkBox, todoContent, rightButtons);
            todoList.append(listItem);
        })
    }
}