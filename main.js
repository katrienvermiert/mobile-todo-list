// data object
let data = (localStorage.getItem('todoList')) ?  JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
};

// remove and complete icons in SVG format
let removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="fill" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>';
let completeSVG ='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="fill" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';

renderTodoList()

// when user clicks on add-button text inside item field is added to todo list
    // also possible document.getElementById('add').onclick; 
    // when function is used multiple times use: function buttonClick and document.getElementById('add').addEventListener('click, buttonClick); 
document.getElementById('add').addEventListener('click', function(){
    let value = document.getElementById('item').value;
    
    if(value){
        addItem(value);
    } 
}); 

document.getElementById('item').addEventListener('keydown', function(e){
    let value = this.value
    if(e.code === 'Enter' && value){
        addItem(value);
    }
});

function addItem(value){
    addItemToDOM(value); 
    document.getElementById('item').value = ''; 

    data.todo.push(value);
    dataObjectUpdated();
}

function renderTodoList(){
    if(!data.todo.length && !data.completed.length) return;
    
    for(let i = 0; i < data.todo.length; i++){
        let value = data.todo[i];
        addItemToDOM(value)
    }

    for(let j = 0; j < data.completed.length; j++){
        let value = data.completed[j];
        addItemToDOM(value, true)
    }
}

function dataObjectUpdated(){
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem(){
    let item = this.parentNode.parentNode;
    let parent = item.parentNode; 
    let id = parent.id;
    let value = item.innerText;

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem(){
    let item = this.parentNode.parentNode;
    let parent = item.parentNode; 
    let id = parent.id;
    let value = item.innerText;

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();

    // check if item needs to be added to the completed list or re-added to the todo list
    let target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

// add new item to todo list
function addItemToDOM(text, completed){
    let list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

    let item = document.createElement('li');
    item.innerText = text;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // add clickevent for removing item
    remove.addEventListener('click', removeItem);

    let complete = document.createElement('button');
    complete.classList.add('complete')
    complete.innerHTML = completeSVG;

    // add clickevent to complete items
    complete.addEventListener('click', completeItem)

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    list.insertBefore(item, list.childNodes[0]);
}