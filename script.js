const changeState = (e) => {
    let check = e.children[0].checked;
    e.children[0].checked = !check;
    let todos = localStorage.getItem('todoapp') ? JSON.parse(localStorage.getItem('todoapp')).todos : {};
    todos[e.children[1].textContent] = check === true ? 0 : 1;
    console.log("CHANGE STATE",todos);
    localStorage.setItem('todoapp',JSON.stringify({todos}));
    e.classList.toggle("bg-success");
}

const addItem = (e) => {
   e.target.disabled = true;
   let todo = document.getElementById('todo');
   if(!todo.value)
    { 
        alert("Please Enter Some value"); return ;
    }
    let li = document.createElement('li');
    let input = document.createElement('input');
    input.type = "checkbox";
    input.classList.add("d-none");
    let span = document.createElement('span');
    span.classList.add("text-warning");
    span.textContent = todo.value;
    li.addEventListener('click',(e) => { changeState(e.target)}) ;
    li.appendChild(input);
    li.appendChild(span);
    li.className = "list-group-item my-2 py-1";
    let ul = document.querySelector('.list-group');
    ul.insertBefore(li,ul.children[0]);
    let todoapp = localStorage.getItem('todoapp') ? JSON.parse(localStorage.getItem('todoapp')) : { todos : {}} ;
    let todos = {   [todo.value] : 0  ,...todoapp.todos };
    localStorage.setItem('todoapp',JSON.stringify({todos}));
    todo.value='';
    e.target.disabled = false;
}

const removeItem = (e) => {
   e.target.disabled = true;
   let doneTodos = document.querySelectorAll('li.bg-success');
   let deletedTodos = [];
   let ul = document.querySelector('.list-group');
   for(let i=0;i<doneTodos.length;i++){
       deletedTodos.push(doneTodos[i].children[1].textContent);
       doneTodos[i].remove();
        }
   let todos = localStorage.getItem('todoapp') ? JSON.parse(localStorage.getItem('todoapp')).todos : {};
   deletedTodos.forEach((val) => { delete todos[val];})
   localStorage.setItem('todoapp',JSON.stringify({ todos }));
   e.target.disabled = false;
}

const setTodo = () => {
    let todosObject = localStorage.getItem('todoapp') ? JSON.parse(localStorage.getItem('todoapp')).todos : {};
    let todos  = Object.keys(todosObject);
    for(let i=0;i<todos.length ; i++){
    let li = document.createElement('li');
    let input = document.createElement('input');
    input.type = "checkbox";
    let check = todosObject[todos[i]] === 1;
    input.checked =  check;
    input.classList.add("d-none");
    let span = document.createElement('span');
    span.classList.add("text-warning");
    span.textContent = todos[i];
    li.addEventListener('click',(e) => { changeState(e.target)}) ;
    li.appendChild(input);
    li.appendChild(span);
    li.className = "list-group-item my-2 py-1";
    if(check)
     li.classList.add('bg-success');
    let ul = document.querySelector('.list-group');
    ul.appendChild(li);
    }
}

setTodo();

var addButton = document.getElementById('add');
var deleteButton = document.getElementById('remove');

addButton.addEventListener('click' , addItem)
deleteButton.addEventListener('click',removeItem)