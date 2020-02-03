const newListButton = document.querySelector("#newListButton");
const listPage = document.querySelector("#listPage");
const listBody = document.querySelector("#listBody");
const deleteListButton = document.querySelector("#deleteList");
const renameListButton = document.querySelector("#renameListButton");
const selectListButton = document.querySelector("#selectListButton");

const todoPage = document.querySelector("#todoPage");
const todoBody = document.querySelector("#todoBody");
const back = document.querySelector("#backToList");
const deleteTaskButton = document.querySelector("#deleteTask");

let deleteElement;
// localStorage.clear()
newListButton.addEventListener("click", createList);
deleteListButton.addEventListener("click", deleteList);

deleteTaskButton.addEventListener("click", deleteTask);

let list = JSON.parse(localStorage.getItem("todo")) || [];
let count = list.length ? Number(list[list.length - 1]) : 0;

let todoCount = 0;

if (list.length) listFromLocalStorage(list);

function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}

function listFromLocalStorage(list) {
  for (let i of list) {
    const cnt = JSON.parse(localStorage.getItem(`${i}`));
    let res = elt("p", { id: i, className: "list", textContent: cnt.name });
    listBody.appendChild(res);
  }
  pSelectorList();
}

function pSelectorList() {
  const selectP = document.querySelectorAll("#listBody");
  for (let i of Array.from(selectP)) {
    i.addEventListener("mousedown", event => {
      event.preventDefault();
      if (event.button == 0) {
        deleteListButtonEnabler(event);
      } else if (event.button == 2) {
        event.preventDefault();
        renameList(event);
      }
    });
    i.addEventListener("contextmenu", event => event.preventDefault());
    i.addEventListener("dblclick", openList);
  }
}

// function listCreateInput() {
//   const todo = elt("input",{type : "text",placeholder : "newList....",required:"true"})
//   // let todo = document.createElement("input");
//   // todo.type = "text";
//   // todo.placeholder = "newList....";
//   // todo.required = "true";
//   todoBody.appendChild(todo);
// }

function createList() {
  const listName = prompt("Enter List name");
  if (listName) {
    count++;
    const res = elt("p", {
      id: count,
      className: "list",
      textContent: listName
    });
    listBody.appendChild(res);
    list.push(res.id);
    localStorage.setItem(
      `${res.id}`,
      JSON.stringify({ id: res.id, name: listName, todos: [] })
    );
    localStorage.setItem("todo", JSON.stringify(list));
    pSelectorList();
  }
}

function renameList(event) {
  const id = event.target.id;
  const renameName = document.getElementById(`${id}`);
  const lName = prompt("Enter the new List Name");
  if (lName) {
    renameName.textContent = lName;
    let list = JSON.parse(localStorage.getItem(`${id}`));
    list.name = lName;
    localStorage.setItem(`${id}`, JSON.stringify(list));
  }
}

function deleteListButtonEnabler(event) {
  deleteListButton.disabled = false;
  deleteElement = event.target;
}

function deleteList() {
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
  todoBody.textContent = "";
  taskPageCreator(event);
}

function taskPageCreator(event) {
  const id = event.target.id;
  const todo = elt("input", {
    type: "text",
    placeholder: "newTask....",
    required: "true"
  });
  // const listName =
  todoBody.appendChild(todo);
  taskFromLocalStorage2(event);
  todo.addEventListener("keydown", event => {
    // if (event.target.value && event.keyCode == "13") addTask(event, id);
    if (event.target.value && event.keyCode == "13") addTask2(event, id);
  });
}

// function taskFromLocalStorage(event) {
//   let listId = event.target.id;
//   let taskList = JSON.parse(localStorage.getItem(`${listId}`));
//   let lTodos = taskList.todos;
//   todoCount = 0;
//   if (lTodos) {
//     for (let i of lTodos) {
//       let task = document.createElement("p");
//       task.innerText = `${i.tName}`;
//       task.id = `${i.tId}`;
//       todoBody.appendChild(task);
//       todoCount = `${i.tId}`;
//       todoCount = Number(todoCount.slice(1));
//     }
//   }
//   pSelectorTask();
// }

function taskFromLocalStorage2(event) {
  let listId = event.target.id;
  let taskList = JSON.parse(localStorage.getItem(`${listId}`));
  let lTodos = taskList.todos;
  todoCount = 0;
  if (lTodos) {
    for (let i of lTodos) {
      const div = elt(
        "div",
        { id: i.tId, className: "taskDiv" },
        elt("input", { type: "checkbox", className: "taskDiv" }),
        elt("p", { innerText: i.tName, className: "taskDiv" }),
        elt("label", { textContent: ` Priority`, className: "taskDiv" }),
        elt(
          "select",
          { className: "taskDiv" },
          elt("option", { value: 0, textContent: "None" }),
          elt("option", { value: 1, textContent: "Low" }),
          elt("option", { value: 2, textContent: "Medium" }),
          elt("option", { value: 3, textContent: "High" })
        ),
        elt("input", { type: "date", value: `${i.date}`, className: "taskDiv" })
      );
      // date.className = priority.className = p.className = label.className = done.className = div.id;
      todoBody.appendChild(div);
      todoCount = `${i.tId}`;
      todoCount = Number(todoCount.slice(1));
      div.addEventListener("click", deleteTaskButtonEnabler);
    }
  }
  // div.addEventListener("click",deleteTaskButtonEnabler)
  // pSelectorTask();
  // deleteTaskButtonEnabler()
}

// function addTask(event, listId) {
//   let task = document.createElement("p");
//   task.innerText = `${event.target.value}`;
//   let taskName = event.target.value;
//   event.target.value = "";
//   todoCount++;
//   task.id = `${listId}${todoCount}`;
//   task.className = "tasks";
//   todoBody.appendChild(task);
//   let list = JSON.parse(localStorage.getItem(`${listId}`));
//   list["todos"].push({
//     tId: task.id,
//     tName: `${taskName}`,
//     priority: "none",
//     date: "No Date Set",
//     notes: ""
//   });
//   localStorage.setItem(`${listId}`, JSON.stringify(list));
//   pSelectorTask();
// }

function addTask2(event, listId) {
  const taskName = event.target.value; //required for updating in localStorage
  event.target.value = "";
  todoCount++;
  const div = elt(
    "div",
    { id: `${listId}${todoCount}`, className: "taskDiv" },
    elt("input", { type: "checkbox", className: "taskDiv" }),
    elt("p", { innerText: taskName, className: "taskDiv" }),
    elt("label", { textContent: ` Priority`, className: "taskDiv" }),
    elt(
      "select",
      { className: "taskDiv" },
      elt("option", { value: 0, textContent: "None" }),
      elt("option", { value: 1, textContent: "Low" }),
      elt("option", { value: 2, textContent: "Medium" }),
      elt("option", { value: 3, textContent: "High" })
    ),
    elt("input", { type: "date", className: "taskDiv" })
  );
  // date.className = priority.className = p.className = label.className = done.className =
  //   div.id;
  todoBody.appendChild(div);
  let list = JSON.parse(localStorage.getItem(`${listId}`));
  list["todos"].push({
    tId: div.id,
    tName: `${taskName}`,
    priority: "none",
    date: "No Date Set",
    notes: ""
  });
  localStorage.setItem(`${listId}`, JSON.stringify(list));
  // pSelectorTask()
  // deleteTaskButtonEnabler()
  div.addEventListener("click", deleteTaskButtonEnabler);
}

function deleteTaskButtonEnabler() {
  deleteTaskButton.disabled = false;
  deleteElement = event.target;
}

back.addEventListener("click", backToListPage);

function backToListPage(event) {
  listPage.style = "display:block";
  todoBody.innerHTML = "";
  todoPage.style = "display:none";
}

// function deleteTaskClick(event) {
//   deleteTaskButton.disabled = false;
//   deleteElement = event.target;
// }

function deleteTask() {
  let element = document.getElementById(deleteElement.id);
  element.parentNode.removeChild(element);
  let listId = deleteElement.id.slice(0, 1);
  let list = JSON.parse(
    localStorage.getItem(`${deleteElement.id.slice(0, 1)}`)
  );
  let todo = list.todos.filter(a => a.tId !== deleteElement.id);
  list.todos = todo;
  localStorage.setItem(`${listId}`, JSON.stringify(list));
  count = list.length ? count : 0;
  deleteTaskButton.disabled = true;
}

function pSelectorTask() {
  const selectP = document.querySelectorAll("#todoBody");
  for (let i of Array.from(selectP)) {
    i.addEventListener("click", deleteTaskClick);
    i.addEventListener("contextmenu", event => event.preventDefault());
    i.addEventListener("dblclick", renameTask);
  }
}

// function renameTask(event) {
//   const taskId = event.target.parentNode.id
//   const listId = event.target.id.slice(0, 1);
//   const renameName = document.getElementById(`${taskId}`);
//   const lName = prompt("Enter the Task Name");
//   if (lName) {
//     renameName.textContent = lName;
//     let list = JSON.parse(localStorage.getItem(`${listId}`));
//     let task = list.todos.map(a => {
//       if (a.tId == taskId) {
//         a.tName = lName;
//       }
//       return a;
//     });
//     list.todos = task;
//     localStorage.setItem(`${listId}`, JSON.stringify(list));
//   }
// }

// function updateTask(event) {
//   const taskId = event.target.parnentNode.id
//   const listId = taskId.slice(0,1) //taskId type check
// }

// include fafa
// addTask2

// task div > <input done> <p> <select (priority)>  <date>
// declare list globally and edit it

//priority date
// console.dir(element)

// Update todo friday:-
// remove prompt
// add individual delete for lists
// naming for functions
// highlighting the selected
// replace the tag with input tag for renaming

// styling of task page
// all other details coming on
// sorting based on date and priority
// how to limit the words inside of a tag
// updating task
// update pSelectorTask()
// insert notes Text Area

// perfection :-
// taking taskId from localStorage(use | as seperator between taskid and listid)

// pSelectorTask
// updating the tasks
// loading the tasks from the localStorage on updateted task
// sorting based on the date and priority
// nav bar - list , today ,  scheduled
// add notes

// use the parentid and create updating task and generating from localStorage
