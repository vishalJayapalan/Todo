const newListButton = document.querySelector("#newListButton");
const listPage = document.querySelector("#listPage");
const listBody = document.querySelector("#listBody");
const deleteListButton = document.querySelector("#deleteList");
const renameListButton = document.querySelector("#renameListButton");
const selectListButton = document.querySelector("#selectListButton");

const todoPage = document.querySelector("#todoPage");
const todoBody = document.querySelector("#todoBody");
const back = document.querySelector("#backToList");
const deleteTaskButton = document.querySelector("#deleteTask")

let deleteElement;
let todoPreCreator;
// localStorage.clear()
newListButton.addEventListener("click", listCreator);
deleteListButton.addEventListener("click", listDelete);

deleteTaskButton.addEventListener("click", deleteTask);



let list = JSON.parse(localStorage.getItem("todo")) || [];
let count = list.length ? Number(list[list.length - 1]) : 0;

let todoCount = 0;

if (list.length) listFromLocalStorage(list);

function listFromLocalStorage(list) {
  for (let i of list) {
    let cnt = JSON.parse(localStorage.getItem(`${i}`));
    const res = document.createElement("p");
    res.id = i;
    res.class = "lists";
    res.textContent = cnt.name;
    listBody.appendChild(res);
  }
  pSelectorList()
}


function pSelectorList(){
  const selectP = document.querySelectorAll("p");
  for (let i of Array.from(selectP)) {
    i.addEventListener("mousedown", event => {
      // i.style.background="grey"
      event.preventDefault();
      if (event.button == 0) {
        deleteListClick(event);
      } else if (event.button == 2) {
        event.preventDefault();
        openList(event);
      }
    });
    i.addEventListener("contextmenu", event => event.preventDefault());
    i.addEventListener("dblclick", renameList);
    
  }
}

function listCreateInput(){
  let todo = document.createElement("input");
  todo.type = "text";
  todo.placeholder = "newList....";
  todo.required = "true";
  todoBody.appendChild(todo);
}

function listCreator() {
  const listName = prompt("Enter List name");
  if (listName) {
    const res = document.createElement("p");
    count++;
    res.id = count;
    res.class = "lists";
    res.textContent = listName;
    listBody.appendChild(res);
    list.push(res.id);
    localStorage.setItem(
      `${res.id}`,
      JSON.stringify({ id: res.id, name: listName, todos: [] })
    );
    localStorage.setItem("todo", JSON.stringify(list));
    pSelectorList()
  }
}

function renameList(event) {


  const id = event.target.id;
  const renameName = document.getElementById(`${id}`);
  const lName = prompt("Enter the List Name");
  if (lName) {
    renameName.textContent = lName;
    let list = JSON.parse(localStorage.getItem(`${id}`))
    list.name=lName
    localStorage.setItem(`${id}`, JSON.stringify(list));
  }
}

function deleteListClick(event) {
  deleteListButton.disabled = false;
  deleteElement = event.target;
}

function listDelete() {
  let element = document.getElementById(deleteElement.id);
  element.parentNode.removeChild(element);
  list = list.filter(a => a != deleteElement.id);
  localStorage.removeItem(`${deleteElement.id}`);
  localStorage.setItem("todo", JSON.stringify(list));
  count = list.length ? count : 0;
  deleteListButton.disabled = true;
}

function openList(event) {
  listPage.style = "display:none";
  todoPage.style = "display:block";
  // while (todoBody.firstChild) {
  //   todoBody.removeChild(todoBody.firstChild);
  // }
  todoBody.innerHTML=""
  taskCreator(event);
}

function taskCreator(event) {
  const id = event.target.id;
  let todo = document.createElement("input");
  todo.type = "text";
  todo.placeholder = "newTask....";
  todo.required = "true";
  todoBody.appendChild(todo);
  taskFromLocalStorage(event);
  todo.addEventListener("keydown", event => {
    if (event.target.value && event.keyCode == "13") addTask(event, id);
    // if (event.target.value && event.keyCode == "13") addTask2(event, id);
  });
}

function taskFromLocalStorage(event) {
  // event.target.style.background = "grey"
  let listId = event.target.id;
  let taskList = JSON.parse(localStorage.getItem(`${listId}`));
  let lTodos = taskList.todos;
  todoCount=0
  if (lTodos) {
    for (let i of lTodos) {
      let task = document.createElement("p");
      task.innerText = `${i.tName}`;
      task.id = `${i.tId}`; 
      todoBody.appendChild(task);
      todoCount = `${i.tId}`
      todoCount = Number(todoCount.slice(1))
    }
  }
  pSelectorTask()
}

function addTask(event, listId) {
  let task = document.createElement("p");
  task.innerText = `${event.target.value}`;
  let taskName = event.target.value;
  event.target.value = "";
  // console.log(todoCount)
  todoCount++;
  // console.log(todoCount)
  task.id = `${listId}${todoCount}`;
  task.className = "tasks";
  todoBody.appendChild(task);
  let list = JSON.parse(localStorage.getItem(`${listId}`));
  list["todos"].push({ tId: task.id, tName: `${taskName}` , priority: 'none' , date:'No Date Set',notes:"" });
  localStorage.setItem(`${listId}`, JSON.stringify(list));
  pSelectorTask()
}

function addTask2(event,listId){
  console.dir(event.target)
  let div =document.createElement("div")
  div.className = "taskDiv"

  // div.innerText = `${event.target.value}`;
  let taskName = event.target.value;   //required for updatiing in localStorage
  // event.target.value = "";
  todoCount++;
  div.id = `${listId}${todoCount}`;

  let checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  let p = document.createElement("p")
  p.innerText = event.target.value
  let date = document.createElement("input")
  date.type = "date"
  let priority = document.createElement("select")
  let high = document.createElement("option")
  let medium = document.createElement("option")
  let low = document.createElement("option")
  high.value=high
  low.value=low
  medium.value=medium
  div.appendChild(checkbox)
  div.appendChild(p)
  div.appendChild(priority)
  div.appendChild(date)
  todoBody.appendChild(div)
  // let list = JSON.parse(localStorage.getItem(`${listId}`));
  // list["todos"].push({ tId: task.id, tName: `${taskName}` , priority: 'none' , date:'No Date Set',notes:"" });
  // localStorage.setItem(`${listId}`, JSON.stringify(list));
  // pSelectorTask()
}

back.addEventListener("click", backToListPage);

function backToListPage(event) {
  listPage.style = "display:block";
  todoPage.style = "display:none";
}

function deleteTaskClick(event) {
  deleteTaskButton.disabled = false;
  deleteElement = event.target;
}

function deleteTask(){
  let element = document.getElementById(deleteElement.id);
  element.parentNode.removeChild(element);
  let listId = deleteElement.id.slice(0,1)
  let list = JSON.parse(localStorage.getItem(`${(deleteElement.id).slice(0,1)}`))
   let todo = list.todos.filter(a => a.tId !== deleteElement.id) 
    list.todos=todo
  localStorage.setItem(`${listId}`, JSON.stringify(list));
  count = list.length ? count : 0;
  deleteTaskButton.disabled = true;
}

function pSelectorTask(){
  const selectP = document.querySelectorAll("p");
  for (let i of Array.from(selectP)) {
    i.addEventListener("click",deleteTaskClick)
    i.addEventListener("contextmenu", event => event.preventDefault());
    i.addEventListener("dblclick", renameTask);
  }
}

function renameTask(event){
  const taskId = event.target.id;
  const listId = event.target.id.slice(0,1)
  const renameName = document.getElementById(`${taskId}`);
  const lName = prompt("Enter the List Name");
  if (lName) {
    renameName.textContent = lName;
    let list = JSON.parse(localStorage.getItem(`${listId}`))
    let task = list.todos.map(a =>{
      if(a.tId == taskId){
        a.tName = lName
      }
      return a
    } )
    list.todos=task
    localStorage.setItem(`${listId}`, JSON.stringify(list));
  }  
}



// task input comming how mant times lists created before reloading
// include fafa
// taskId count problems
// priority
// addTask2 

// task div > <input checkbox> <p> <select (priority)>  <date>
// declare list globally and edit it
