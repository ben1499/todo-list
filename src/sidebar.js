import { addProject, getProjects, deleteProject, getTodaysItems } from './todoController';
import dashboard from './dashboard';


export default function sidebar() {
    const content = document.getElementById('content');
    const nav = document.createElement('nav');
    const upperList = document.createElement('ul');
    const lowerList = document.createElement('ul');
    const upperListTitle = document.createElement('h3');
    const lowerListTitle = document.createElement('h3');
    const inboxListItem = document.createElement('li');
    const todayListItem = document.createElement('li');
    const addButton = document.createElement('button');
    const createDialog = document.createElement('div');
    const projectInput = document.createElement('input');
    const errorText = document.createElement('p');
    const submitButton = document.createElement('button');
    const cancelButton = document.createElement('button');  
    const projectsList = document.createElement('ul');
    const addBtnListItem = document.createElement('li');
    const buttonGroup = document.createElement('div');

    errorText.classList.add('error-text');
    errorText.textContent = 'Project already exists';

    buttonGroup.classList.add('btn-group');

    inboxListItem.textContent = "Inbox";

    inboxListItem.setAttribute('data-name', 'Inbox');
    todayListItem.setAttribute('data-name', 'Today');

    nav.classList.add('sidebar');
    
    upperListTitle.textContent = 'Home';
    lowerListTitle.textContent = 'Projects';

    upperListTitle.classList.add('list-title');
    lowerListTitle.classList.add('list-title');


    addButton.classList.add('add-project-btn');
    addButton.textContent = '+ Add Project';

    addBtnListItem.append(addButton);

    projectInput.placeholder = 'Enter Project Name';
    submitButton.textContent = 'Add';
    cancelButton.textContent = 'Cancel';

    buttonGroup.append(cancelButton, submitButton);

    createDialog.append(projectInput, errorText, buttonGroup);

    createDialog.classList.add('project-dialog');

    inboxListItem.addEventListener('click', function() {
        clearDashboard();
        dashboard('Inbox');
    })

    todayListItem.textContent = "Today";

    todayListItem.addEventListener('click', function() {
        clearDashboard();
        dashboard('none', false, 'Today');
    })

    upperList.append(upperListTitle, inboxListItem, todayListItem);

    function clearDashboard() {
        const main = document.querySelector('main');
        main.textContent = '';
    }

    addButton.addEventListener('click', () => {
        createDialog.classList.add('visible');
        projectInput.focus();
    })

    submitButton.setAttribute('disabled', true);

    projectInput.addEventListener('input', function (e) {
        if (this.value) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', true);
        }
    })

    //Submit when click on Enter key
    projectInput.addEventListener('keypress', function (e) {
        if (projectInput.value && e.key === 'Enter') {
            submitButton.click();
        }
    })

    submitButton.addEventListener('click', () => {
        const projects = getProjects();
        if (projects.includes(projectInput.value)) {
            errorText.classList.add('error-visible');
        } else {
            errorText.classList.remove('error-visible');
            addProject(projectInput.value);
            createDialog.classList.remove('visible');
            renderProjects();
            projectInput.value = '';
        }
        
    })


    //Render projects on load
    renderProjects();


    function renderProjects() {
        projectsList.textContent = '';
        let projects = getProjects();
        projects = projects.slice(1);

        projects.forEach((project, index) => {
            const listItem = document.createElement('li');
            const deleteButton = document.createElement('button');
            listItem.setAttribute('data-id', index);
            listItem.setAttribute('data-name', project);
            deleteButton.setAttribute('data-id', index);
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'delete';
            deleteButton.classList.add('material-icons')
            

            deleteButton.addEventListener('click', function(e) {
                deleteProject(+this.dataset.id);
                renderProjects();
                clearDashboard();
                dashboard();
                e.stopPropagation();
            })

            listItem.addEventListener('click', function(e) {
                clearDashboard();
                dashboard(project, true, project);
               
            })


            listItem.append(project, deleteButton);
            projectsList.append(listItem);

            
        })
    }

    cancelButton.addEventListener('click', () => {
        projectInput.value = '';
        createDialog.classList.remove('visible');
        errorText.classList.remove('error-visible');
    })

    lowerList.append(lowerListTitle, addBtnListItem, createDialog, projectsList);

    nav.append(upperList, lowerList)

    content.append(nav);
}