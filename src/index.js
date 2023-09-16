import sidebar from "./sidebar"
import dashboard from "./dashboard.js";
import 'material-icons/iconfont/material-icons.css';
import { populateLocalStorageTodoData, populateLocalStorageProjectData } from './todoController';



document.addEventListener('DOMContentLoaded', () => {
    populateLocalStorageTodoData();
    populateLocalStorageProjectData();
    const content = document.getElementById('content');
    const main = document.createElement('main');
    content.appendChild(main);
    sidebar();
    dashboard();
    // document.body.setAttribute('id', 'background-blur');
})