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
    const submitButton = document.createElement('button');
    const cancelButton = document.createElement('button');  
    const projectsList = document.createElement('ul');

    inboxListItem.textContent = "Inbox";

    nav.classList.add('sidebar');
    
    upperListTitle.textContent = 'Home';
    lowerListTitle.textContent = 'Projects';

    upperListTitle.classList.add('list-title');
    lowerListTitle.classList.add('list-title');

    addButton.textContent = 'Add New Project';
    projectInput.placeholder = 'Enter Project Name';
    submitButton.textContent = 'Add';
    cancelButton.textContent = 'Cancel';

    createDialog.append(projectInput, submitButton, cancelButton);

    createDialog.classList.add('project-dialog');

    inboxListItem.addEventListener('click', function() {
        clearDashboard();
        dashboard('Inbox');
    })

    todayListItem.textContent = "Today";

    todayListItem.addEventListener('click', function() {
        clearDashboard();
        dashboard('none', false);
    })

    upperList.append(upperListTitle, inboxListItem, todayListItem);

    function clearDashboard() {
        const main = document.querySelector('main');
        main.textContent = '';
    }

    addButton.addEventListener('click', () => {
        createDialog.classList.toggle('visible');
    })

    submitButton.addEventListener('click', () => {
        addProject(projectInput.value);
        createDialog.classList.remove('visible');
        renderProjects();
        projectInput.value = '';
    })

    

    function renderProjects() {
        projectsList.textContent = '';
        let projects = getProjects();
        projects = projects.slice(1);

        projects.forEach((project, index) => {
            const listItem = document.createElement('li');
            const deleteButton = document.createElement('button');
            listItem.setAttribute('data-id', index);
            deleteButton.setAttribute('data-id', index);
            deleteButton.textContent = 'delete';
            deleteButton.classList.add('material-icons')
            

            deleteButton.addEventListener('click', function(e) {
                deleteProject(+this.dataset.id);
                renderProjects();
                e.stopPropagation();
            })

            listItem.addEventListener('click', function(e) {
                clearDashboard();
                dashboard(project);

            })


            listItem.append(project, deleteButton);
            projectsList.append(listItem);

            
        })
    }

    cancelButton.addEventListener('click', () => {
        createDialog.classList.remove('visible');
    })


    lowerList.append(lowerListTitle, addButton, createDialog, projectsList);

    nav.append(upperList, lowerList)

    content.append(nav);
}