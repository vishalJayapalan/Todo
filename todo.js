const newListButton = document.querySelector("#newListButton");
const listBody = document.querySelector("#listBody");
const deleteListButton = document.querySelector("#deleteList");
const renameListButton = document.querySelector("#renameListButton");
const selectListButton = document.querySelector("#selectListButton");

const todoBody = document.querySelector("#todoBody")

let deleteElement;
let todoPreCreator;
// localStorage.clear()
newListButton.addEventListener("click", listCreator);
deleteListButton.addEventListener("click", listDelete);

let list = JSON.parse(localStorage.getItem("todo")) || [];
let count = list.length ? Number(list[list.length - 1]) : 0;

let todoCount = 0

if (list.length) listFromLocalStorage(list);

function listFromLocalStorage(list) {
  for (let i of list) {
    let cnt = JSON.parse(localStorage.getItem(`${i}`));
    const res = document.createElement("p");
    res.id = i;
    res.textContent = cnt.name;
    listBody.appendChild(res);
  }
}

function listCreator() {
  const listName = prompt("Enter List name");
  if (listName) {
    const res = document.createElement("p");
    count++;
    res.id = count;
    res.textContent = listName;
    listBody.appendChild(res);
    list.push(res.id);
    localStorage.setItem(
      `${res.id}`,
      JSON.stringify({ id: res.id, name: listName ,todos:[]})
    );
    localStorage.setItem("todo", JSON.stringify(list));
    const selectP = document.querySelectorAll("p");
for (let i of Array.from(selectP)) {
  i.addEventListener("mousedown",event=>{
    if(event.button == 0){
      deleteOnClick(event)
    }
    else if(event.button == 2){
      event.preventDefault()
      openList(event)
    }
  })
  i.addEventListener("dblclick", renameList);
  i.addEventListener('contextmenu', event => event.preventDefault())
  // i.addEventListener("click", deleteOnClick);
}
  }
}

function renameList(event) {
  const id = event.target.id;
  const renameName = document.getElementById(`${id}`);
  const lName = prompt("Enter the List Name");
  if (lName) {
    renameName.textContent = lName;
    localStorage.setItem(`${id}`, JSON.stringify({ id, name: lName }));
  }
}

function deleteOnClick(event) {
  // deleteListButton.style.display = "block";
  deleteListButton.disabled=false
  deleteElement = event.target;
}

function listDelete() {
  let element = document.getElementById(deleteElement.id);
  element.parentNode.removeChild(element);
  list = list.filter(a => a != deleteElement.id);
  localStorage.removeItem(`${deleteElement.id}`);
  localStorage.setItem("todo", JSON.stringify(list));
  count = list.length ? count : 0;
  deleteListButton.disabled=true
}
const selectP = document.querySelectorAll("p");
for (let i of Array.from(selectP)) {
  i.addEventListener("mousedown",event=>{
    // event.preventDefault()
    if(event.button == 0){
      deleteOnClick(event)
    }
    else if(event.button == 2){
      event.preventDefault()
      openList(event)
      console.log("test",event.button)
    }
  })
  i.addEventListener('contextmenu', event => event.preventDefault())
  i.addEventListener("dblclick", renameList);
  // i.addEventListener("click", deleteOnClick);
}


function openList(event){
  // console.log("vishal")
  listBody.style="display:none"
  todoBody.style="display:block"
  todoPreCreator = true
  taskCreator(event)
}

// function elt(name, attrs, ...children) {
//   let dom = document.createElement(name);
//   for (let attr of Object.keys(attrs)) {
//     dom.setAttribute(attr, attrs[attr]);
//   }
//   for (let child of children) {
//     dom.appendChild(child);
//   }
//   return dom;
// }

function taskCreator(event){
  // if(todoPreCreator){
  //   if(JSON.parse(localStorage.getItem(event.target.id))[todos]){
  //   // when there is todo stored in localstorage before only
  //   }
  //   todoPreCreator=false;
  // }
  const id = event.target.id
  // console.log(event.target.id,"ithanu id")
  let todo = document.createElement("input")
  // todo.id = `to${todoCount+1}`
  todo.type="text"
  todo.placeholder="newTask...."
  todo.required="true"
  todoBody.appendChild(todo)
  todo.addEventListener("keydown",event =>{ if (event.target.value && event.keyCode =='13') addTask(event,id)})

}

function addTask(event,listId){
  let task = document.createElement('p')
  task.innerText = `${event.target.value}`
  let taskName = event.target.value
  event.target.value=""
  todoCount++
  // console.log(event.target.value)
  task.id = `${listId}${todoCount}`  // set the taskid
  todoBody.appendChild(task)
  console.log(task.id)
  let list = JSON.parse(localStorage.getItem(`${listId}`))
  console.log(list)
  // let todos = list.todos
  // todos.push('vsihal')
  // console.log(todos)
  list['todos'].push({tId:task.id,tName:`${taskName}`})
  console.log(list)
  localStorage.setItem(`${listId}`,JSON.stringify(list))
}