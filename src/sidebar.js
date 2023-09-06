import { addProject, getProjects } from './todoController';

export default function sidebar() {
    const content = document.getElementById('content');
    const nav = document.createElement('nav');
    const upperList = document.createElement('ul');
    const lowerList = document.createElement('ul');
    const lowerListTitle = document.createElement('h3');
    const inboxListItem = document.createElement('li');
    const addButton = document.createElement('button');
    const createDialog = document.createElement('div');
    const projectInput = document.createElement('input');
    const submitButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    const projectsList = document.createElement('ul');

    inboxListItem.textContent = "Inbox";

    nav.classList.add('sidebar');
    upperList.append(inboxListItem);

    lowerListTitle.textContent = 'Projects';

    addButton.textContent = 'Add New Project';
    projectInput.placeholder = 'Enter Project Name';
    submitButton.textContent = 'Add';
    cancelButton.textContent = 'Cancel';

    createDialog.append(projectInput, submitButton, cancelButton);

    createDialog.classList.add('project-dialog');

    addButton.addEventListener('click', () => {
        createDialog.classList.toggle('visible')
    })

    submitButton.addEventListener('click', () => {
        addProject(projectInput.value);
        createDialog.classList.remove('visible');
    })

    cancelButton.addEventListener('click', () => {
        createDialog.classList.remove('visible');
    })

    lowerList.append(lowerListTitle, addButton, createDialog);

    nav.append(upperList, lowerList)

    content.append(nav);
}